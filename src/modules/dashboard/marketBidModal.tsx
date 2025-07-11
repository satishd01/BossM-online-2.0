"use client";
import { Modal } from "@/components/common/modal";
import { convertCamelCaseToTitle } from "@/utils";
import { declareBidResultType, game, market } from "./types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { declareBidResultSchema } from "./validation-schema";
import Textinput from "@/components/common/Textinput";
import { Button } from "@mui/material";
import useAxiosPost from "../../../hooks/axios/useAxiosPost";
import { useEffect, useState } from "react";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
import CopyButton from "@/components/common/copyButton";
import { DatePicker } from "@/components/common/datePicker";
import React from "react";
import { format } from "date-fns";
import { CopyAllOutlined, PictureAsPdf } from "@mui/icons-material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface JsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

const MarketBidModal = ({
  market,
  setMarket,
}: {
  market?: { id: number; marketName: string };
  setMarket: React.Dispatch<
    React.SetStateAction<{ id: number; marketName: string } | undefined>
  >;
}) => {
  const {
    register,
    formState: { errors },
    control,
    reset,
    clearErrors,
    handleSubmit,
  } = useForm<declareBidResultType>({
    resolver: yupResolver(declareBidResultSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [load, setLoad] = useState<string>("open");
  const [declareGameBid, setDeclareGameBid] = useState<game>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [marketDetails, setMarketDetails] = useState<market>();

  const { post } = useAxiosPost(`/bid/declare-bid-result`);
  const { fetchData: getLoadDetails } = useAxiosGet(
    `/dashboard/get-load-details/${market?.id}?type=${load}${
      selectedDate ? "&date=" + selectedDate.toISOString() : ""
    }`
  );

  const totalCount = marketDetails?.totalCount || 0;

  const onSubmit = async (data: declareBidResultType) => {
    if (!declareGameBid) return;
    const res = await post({
      winAmount: data.winAmount,
      bidDigit: data.bidDigit,
      marketId: market?.id,
      gameId: declareGameBid.id,
    });
    if (res?.success) {
      setDeclareGameBid(undefined);
      reset();
    }
  };

  const handleLoad = async () => {
    const res = await getLoadDetails();
    if (res?.success) {
      setMarketDetails(res.result?.data[0]);
    }
  };

  const handleCopyAllBids = () => {
    const grandTotal = marketDetails?.games?.reduce((acc, game) => acc + game.bidCount, 0) || 0;
    const dateStr = format(selectedDate || new Date(), "dd/MM/yyyy");
    
    const content = [
      marketDetails?.marketName,
      `(${load} ${dateStr})`,
      "",
      ...(marketDetails?.games?.map(game => [
        `**${convertCamelCaseToTitle(game.gameName)}**`,
        ...(game.bids?.map(bid => `${bid.key} - ${bid.count}`) || []),
        `Total: ${game.bidCount}`,
        ""
      ]).flat() || []),
      `Grand Total: ${grandTotal}`
    ].join("\n");

    navigator.clipboard.writeText(content);
  };

  const downloadAsPDF = () => {
    if (!marketDetails?.games) return;

    const doc = new jsPDF() as JsPDFWithAutoTable;
    const date = format(selectedDate || new Date(), "dd/MM/yyyy");
    
    // Title
    doc.setFontSize(16);
    doc.text(`${market?.marketName} - ${load} Bids`, 14, 15);
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 14, 22);

    let yPosition = 30;

    // Game tables
    marketDetails.games.forEach(game => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(convertCamelCaseToTitle(game.gameName), 14, yPosition);
      yPosition += 8;

      autoTable(doc, {
        startY: yPosition,
        head: [["Bid Key", "Amount"]],
        body: game.bids?.map(bid => [bid.key, bid.count.toString()]) || [],
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold'
        }
      });

      yPosition = (doc.lastAutoTable?.finalY || yPosition) + 10;
      doc.setFontSize(10);
      doc.text(`Total: ${game.bidCount}`, 14, yPosition);
      yPosition += 15;
    });

    // Grand total
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Grand Total: ${totalCount}`, 14, yPosition);

    doc.save(`${market?.marketName}_${load}_bids_${date.replace(/\//g, '-')}.pdf`);
  };

  useEffect(() => {
    handleLoad();
  }, [load, selectedDate]);

  const BidTable = React.memo(({ game }: { game: game }) => (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-primary text-white p-2 text-left border border-primary">Bid Key</th>
            <th className="bg-primary text-white p-2 text-left border border-primary">Amount</th>
          </tr>
        </thead>
        <tbody>
          {game.bids?.length ? (
            game.bids.map((bid, index) => (
              <tr key={index}>
                <td className="p-2 border border-gray-300">{bid.key}</td>
                <td className="p-2 border border-gray-300">{bid.count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2 border border-gray-300">-</td>
              <td className="p-2 border border-gray-300">-</td>
            </tr>
          )}
        </tbody>
      </table>
      <p className="mt-2"><strong>Total:</strong> {game.bidCount}</p>
      <p><strong>Total Amount:</strong> {totalCount}</p>
    </div>
  ));
  BidTable.displayName = "BidTable";

  const handleSingleBidCopy = (game: game) => {
    const bids = game.bids?.map(bid => `${bid.key} - ${bid.count}`).join("\n") || "";
    return `${convertCamelCaseToTitle(game.gameName)}\n${bids}\nTotal: ${game.bidCount}\n`;
  };

  return (
    <Modal
      closeForm={() => {
        setMarket(undefined);
        setDeclareGameBid(undefined);
        reset();
      }}
      isOpen={!!market}
      modalTitle={
        declareGameBid 
          ? `Declare result for ${declareGameBid.gameName}` 
          : `Bid for ${market?.marketName}`
      }
      className="w-full md:w-[450px] max-h-[88vh] overflow-y-auto"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Button
            variant={load === "open" ? "contained" : "outlined"}
            onClick={() => setLoad("open")}
          >
            Open Load
          </Button>
          <Button
            variant={load === "close" ? "contained" : "outlined"}
            onClick={() => setLoad("close")}
          >
            Close Load
          </Button>
          <Button
            onClick={handleCopyAllBids}
            className="bg-gray-100"
            startIcon={<CopyAllOutlined />}
          >
            Copy All
          </Button>
          <Button
            onClick={downloadAsPDF}
            className="bg-gray-100"
            startIcon={<PictureAsPdf />}
          >
            Export PDF
          </Button>
        </div>

        <div className="space-y-2">
          <label className="block text-primary">Select Date</label>
          <DatePicker
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                const localDate = new Date(date);
                localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
                setSelectedDate(localDate);
              } else {
                setSelectedDate(undefined);
              }
            }}
            showTodaysDate
            className="h-11 w-full"
          />
        </div>

        <div className="text-primary">
          <p><strong>Total Bid Amount:</strong> {totalCount}</p>
        </div>

        {declareGameBid && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Textinput
              name="bidDigit"
              label="Bid digit"
              type="number"
              control={control}
              register={register}
              error={errors.bidDigit}
              className="w-full h-9 bg-gray-100 border border-primary"
            />
            <Textinput
              name="winAmount"
              label="Win amount"
              type="number"
              register={register}
              error={errors.winAmount}
              className="w-full h-9 bg-gray-100 border border-primary"
            />
            <div className="flex gap-3">
              <Button type="submit" variant="contained">
                Declare Result
              </Button>
              <Button
                variant="outlined"
                onClick={() => setDeclareGameBid(undefined)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {marketDetails?.games?.map(game => (
          <div key={game.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">
                {convertCamelCaseToTitle(game.gameName)}
              </h3>
              <CopyButton textToCopy={handleSingleBidCopy(game)} />
            </div>
            <BidTable game={game} />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default MarketBidModal;