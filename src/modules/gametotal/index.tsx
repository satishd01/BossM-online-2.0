"use client";
import { Grid, Typography, Button, Card, CardContent, CircularProgress } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";

const GameTotal = () => {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [summary, setSummary] = useState<any>(null);
  const [summaryLoading, setSummaryLoading] = useState<boolean>(false);

  // Fetch games data
  const onGamesSuccess = (data: any) => {
    setGames(data.result.data.reverse())
    setLoading(false);
  };

  const { fetchData: fetchGames } = useAxiosGet(
    `/game/get-games`,
    onGamesSuccess
  );

  // Fetch game summary
  const onSummarySuccess = (data: any) => {
    setSummary(data.result.summary);
    setSummaryLoading(false);
  };

  const { fetchData: fetchSummary } = useAxiosGet(
    `/bid/admin/game-bid-summary?gameId=${selectedGame}`,
    onSummarySuccess
  );

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    if (selectedGame) {
      setSummaryLoading(true);
      fetchSummary();
    }
  }, [selectedGame]);

  const handleGameClick = (gameId: number) => {
    setSelectedGame(gameId);
  };

  // Color variants for game cards
  const cardColors = [
    { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800" },
    { bg: "bg-green-50", border: "border-green-200", text: "text-green-800" },
    { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-800" },
    { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800" },
    { bg: "bg-red-50", border: "border-red-200", text: "text-red-800" },
  ];

  return (
    <PageContainer
      title="Game Totals"
      description="Summary of game totals and bids"
    >
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Game Totals">
            <div className="space-y-6">
              {/* Games List Section */}
              <div>
                <Typography variant="h6" className="mb-4">Available Games</Typography>
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <CircularProgress />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {games.map((game, index) => (
                      <Card 
                        key={game.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${cardColors[index % cardColors.length].bg} ${cardColors[index % cardColors.length].border} ${selectedGame === game.id ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => handleGameClick(game.id)}
                      >
                        <CardContent className="text-center">
                          <Typography variant="h6" className={cardColors[index % cardColors.length].text}>
                            {game.gameName}
                          </Typography>
                          <Typography variant="subtitle2" className="mt-2">
                            Rate: {game.rate}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              {/* Summary Section */}
              <div>
                <Typography variant="h6" className="mb-4">
                  {selectedGame ? `Summary for Selected Game` : 'Select a game to view summary'}
                </Typography>
                
                {summaryLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <CircularProgress />
                  </div>
                ) : summary ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded">
                        <Typography variant="subtitle2">Total Bids</Typography>
                        <Typography variant="h6">
                          {summary.totalBids}
                        </Typography>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded">
                        <Typography variant="subtitle2">Total Bid Amount</Typography>
                        <Typography variant="h6">
                          {summary.totalBidAmount?.toFixed(2) || '0.00'}
                        </Typography>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded">
                        <Typography variant="subtitle2">Total Win Amount</Typography>
                        <Typography variant="h6">
                          {summary.totalWinAmount?.toFixed(2) || '0.00'}
                        </Typography>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded">
                        <Typography variant="subtitle2">Total Winning Bids</Typography>
                        <Typography variant="h6">
                          {summary.totalWinningBids}
                        </Typography>
                      </div>
                      
                      <div className={`p-4 rounded ${
                        summary.netProfit >= 0 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                      }`}>
                        <Typography variant="subtitle2">Net Profit</Typography>
                        <Typography variant="h6">
                          {summary.netProfit?.toFixed(2) || '0.00'}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <Typography variant="subtitle1" className="text-gray-500">
                      {selectedGame ? 'Loading summary...' : 'No game selected'}
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default GameTotal;