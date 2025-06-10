"use client";
import { Grid, Typography, Button, MenuItem, Select, FormControl, InputLabel, CircularProgress } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import React, { useEffect, useState, useRef } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Agent {
  id: number;
  fullName: string;
  phoneNumber: string;
}

interface MarketCommission {
  marketId: number;
  marketName: string;
  totalBidAmount: string;
  commission: string;
}

interface CommissionReportData {
  admin: {
    id: number;
    fullName: string;
    commissionRate: number;
  };
  markets: MarketCommission[];
  totalBidAmount: string;
  totalCommission: string;
}

const CommissionReport = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [reportData, setReportData] = useState<CommissionReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [agentsLoading, setAgentsLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const pdfRef = useRef<HTMLDivElement>(null);

  // Fetch agents data
  const onAgentsSuccess = (data: any) => {
    const formattedAgents = data.body.map((agent: any) => ({
      id: agent.id,
      fullName: agent.fullName,
      phoneNumber: agent.phoneNumber
    }));
    setAgents(formattedAgents);
    setAgentsLoading(false);
    if (formattedAgents.length > 0) {
      setSelectedAgentId(formattedAgents[0].id);
    }
  };

  const { fetchData: fetchAgents } = useAxiosGet(`/user/agent-profile`, onAgentsSuccess);

  // Fetch commission report data
  const onReportSuccess = (data: any) => {
    setReportData(data.body);
    setLoading(false);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAgentId) {
      setLoading(true);
      const url = `/user/commission-report?adminId=${selectedAgentId}&startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url);
      const data = await response.json();
      onReportSuccess(data);
    }
  };

  const exportToPDF = async () => {
    if (!pdfRef.current || !reportData) return;

    const input = pdfRef.current;
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`commission_report_${reportData.admin.fullName}_${startDate}_to_${endDate}.pdf`);
  };

  return (
    <PageContainer
      title="Agent Commission Report"
      description="Agent commission details"
    >
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Agent Commission Report">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Filters Section with PDF Button */}
              <div className="flex justify-between items-center mb-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow mr-4">
                  <FormControl fullWidth size="small">
                    <InputLabel id="agent-select-label">Agent</InputLabel>
                    <Select
                      labelId="agent-select-label"
                      label="Agent"
                      value={selectedAgentId || ''}
                      onChange={(e) => setSelectedAgentId(Number(e.target.value))}
                      disabled={agentsLoading}
                    >
                      {agentsLoading ? (
                        <MenuItem disabled>
                          <CircularProgress size={20} />
                        </MenuItem>
                      ) : (
                        agents.map((agent) => (
                          <MenuItem key={agent.id} value={agent.id}>
                            {agent.fullName} ({agent.phoneNumber})
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>

                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2 border rounded h-[40px]"
                      max={endDate}
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-2 border rounded h-[40px]"
                      min={startDate}
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={loading || !selectedAgentId}
                      className="h-[40px] w-full"
                      size="small"
                    >
                      {loading ? <CircularProgress size={20} /> : 'Submit'}
                    </Button>
                  </div>
                </div>

                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={exportToPDF}
                  disabled={loading || !reportData}
                  className="h-[40px]"
                  size="small"
                >
                  Export PDF
                </Button>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              {/* Results Section */}
              <div ref={pdfRef}>
                <div className="mb-4">
                  <Typography variant="h6">Agent Commission Report</Typography>
                  <Typography variant="body2">{new Date().toLocaleDateString()}</Typography>
                  <Typography variant="body1">
                    {reportData?.admin?.fullName || (selectedAgentId ? 'Loading...' : 'Select an agent')}
                  </Typography>
                  {reportData && (
                    <Typography variant="body2">
                      Commission Rate: {reportData.admin.commissionRate}%
                    </Typography>
                  )}
                </div>

                <div className="border-t border-gray-200 my-2"></div>

                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <CircularProgress />
                  </div>
                ) : reportData ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <Typography variant="subtitle1">
                        Show | {reportData.markets.length} entries
                      </Typography>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full border">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left border">Sr No</th>
                            <th className="px-4 py-2 text-left border">Market</th>
                            <th className="px-4 py-2 text-left border">Bid Amount</th>
                            <th className="px-4 py-2 text-left border">Commission Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.markets.length > 0 ? (
                            reportData.markets.map((market, index) => (
                              <tr key={market.marketId} className="border">
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">{market.marketName}</td>
                                <td className="px-4 py-2 border">{market.totalBidAmount}</td>
                                <td className="px-4 py-2 border">{market.commission}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="px-4 py-2 text-center border">
                                No commission data available for selected period
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-between items-center">
                      <Typography variant="body2">
                        Showing {reportData.markets.length ? 1 : 0} to {reportData.markets.length} of {reportData.markets.length} entries
                      </Typography>
                    </div>

                    <div className="border-t border-gray-200 my-2"></div>

                    <div className="flex justify-end space-x-4">
                      <Typography variant="h6">Total</Typography>
                      <div className="text-right">
                        <Typography>{reportData.totalBidAmount}</Typography>
                        <Typography>{reportData.totalCommission}</Typography>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-32">
                    <Typography>
                      {selectedAgentId ? 'Loading commission data...' : 'Please select an agent'}
                    </Typography>
                  </div>
                )}
              </div>
            </form>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CommissionReport;