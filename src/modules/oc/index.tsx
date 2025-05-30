"use client";
import { Grid, Typography, Button } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import React, { useEffect, useState, useRef } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const OCGroupCombined = () => {
  const [gameData, setGameData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = useState<string>("2025-05-30");
  const [game, setGame] = useState<string>("");
  const [session, setSession] = useState<string>("open");
  const [gameType, setGameType] = useState<string>("single");
  const [percentage, setPercentage] = useState<string>("");
  const [markets, setMarkets] = useState<any[]>([]);
  const [marketLoading, setMarketLoading] = useState<boolean>(true);
  const pdfRef = useRef<HTMLDivElement>(null);

  // Fetch markets data
  const onMarketsSuccess = (data: any) => {
    setMarkets(data.result.data);
    setMarketLoading(false);
    if (data.result.data.length > 0) {
      setGame(data.result.data[0].marketName);
    }
  };

  const { fetchData: fetchMarkets } = useAxiosGet(
    `/market/get-market?page=1&limit=10`,
    onMarketsSuccess
  );

  // Fetch game results
  const onGameSuccess = (data: any) => {
    setGameData(data.result.data);
    setLoading(false);
  };

  const { fetchData: fetchGameResults } = useAxiosGet(
    `/game/results?gameId=2&session=${session}&gameType=${gameType}&percentage=${percentage || "null"}&null=null&date=${date}`,
    onGameSuccess
  );

  useEffect(() => {
    fetchMarkets();
  }, []);

  useEffect(() => {
    if (game) {
      fetchGameResults();
    }
  }, [date, game, session, gameType, percentage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchGameResults();
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and empty string
    if (value === "" || /^\d+$/.test(value)) {
      setPercentage(value);
    }
  };

  const exportToPDF = async () => {
    if (!pdfRef.current) return;

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
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("oc_group_combined_report.pdf");
  };

  return (
    <PageContainer
      title="OC Group Combined"
      description="OC Group Combined results"
    >
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="OC Group Combined">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Filters Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Market</label>
                  <select
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                    className="w-full p-2 border rounded"
                    disabled={marketLoading}
                  >
                    {marketLoading ? (
                      <option>Loading markets...</option>
                    ) : (
                      markets.map((market) => (
                        <option key={market.id} value={market.marketName}>
                          {market.marketName}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Session</label>
                  <select
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="open">Open</option>
                    <option value="close">Close</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Game Type</label>
                  <select
                    value={gameType}
                    onChange={(e) => setGameType(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="single">Single</option>
                    <option value="regular">Regular</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Percent</label>
                  <input
                    type="text"
                    value={percentage}
                    onChange={handlePercentageChange}
                    placeholder="Enter percentage"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading || marketLoading}
                >
                  Submit
                </Button>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              {/* Results Section - This will be captured for PDF */}
              <div ref={pdfRef}>
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <Typography>Loading results...</Typography>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Typography variant="h6">Overall Summary</Typography>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                          <Typography variant="subtitle2">Total Amount</Typography>
                          <Typography variant="h6">
                            {gameData?.currency || '¥'}{gameData?.totalAmount?.toFixed(2) || '0.00'} (Total Bids - {gameData?.totalBids || 0})
                          </Typography>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded">
                          <Typography variant="subtitle2">Winning Amount</Typography>
                          <Typography variant="h6">
                            {gameData?.currency || '¥'}{gameData?.winningAmount?.toFixed(2) || '0.00'}
                          </Typography>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded">
                          <Typography variant="subtitle2">Total Profit</Typography>
                          <Typography variant="h6">
                            {gameData?.currency || '¥'}{gameData?.totalProfit?.toFixed(2) || '0.00'}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={exportToPDF}
                  disabled={loading || !gameData}
                >
                  Export PDF
                </Button>
              </div>
            </form>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default OCGroupCombined;