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
import { CopyAllOutlined } from "@mui/icons-material";

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
  } = useForm({
    resolver: yupResolver<declareBidResultType>(declareBidResultSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [load, setLoad] = useState<string>("open");
  const [declareGameBid, setDeclareGameBid] = useState<game>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const { post } = useAxiosPost(`/bid/declare-bid-result`);
  const { fetchData: getLoadDetails } = useAxiosGet(
    `/dashboard/get-load-details/${market?.id}?type=${load}${
      selectedDate ? "&date=" + selectedDate.toISOString() : ""
    }`
  );
  const [marketDetails, setMarketDetails] = useState<market>();
  const onSubmit = async (data: declareBidResultType) => {
    if (!declareGameBid) return;
    const { id } = declareGameBid;
    const { bidDigit, winAmount } = data;
    const payload = {
      winAmount,
      bidDigit,
      marketId: market?.id,
      gameId: id,
    };
    const res = await post(payload);
    if (res && res?.success) {
      setDeclareGameBid(undefined);
      reset();
    }
  };

  const handleLoad = async () => {
    const res = await getLoadDetails();
    if (res && res?.success) {
      setMarketDetails(res?.result?.data[0]);
    }
  };

  const totalCount = marketDetails?.totalCount || 0

  const handleCopyAllBids = () => {
    const grandTotalAmount = marketDetails?.games?.reduce(
      (acc, game) => acc + game?.bidCount,
      0
    );
    const marketName = marketDetails?.marketName;
    const dateString = `(${load} ${format(
      selectedDate || new Date(),
      "dd/MM/yyyy"
    )})`;

    let arrayOfString = `${marketName}\n${dateString}\n\n`;

    // Build game details
    const gameDetails =
      marketDetails?.games
        ?.map((game) => {
          const bidsString =
            game?.bids
              ?.map((bid) => `\n ${bid?.key} - ${bid?.count}`)
              .join("") || "";
          return `**${convertCamelCaseToTitle(
            game?.gameName
          )}**${bidsString}\n Total:- ${game?.bidCount}\n\n`;
        })
        .join("\n") || "";

    arrayOfString += gameDetails;
    arrayOfString += `Grand Total Amount:- ${grandTotalAmount}\n`;

    // Copy to clipboard
    if (arrayOfString) navigator.clipboard.writeText(arrayOfString);
  };

  useEffect(() => {
    handleLoad();
  }, [load, selectedDate]);

  const BidTable = React.memo(({ game }: { game: game }) => {
    const bids = game?.bids || [];
    const totalBids = game?.bidCount || 0;

    return (
      <div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                className="border border-primary bg-primary text-white"
                style={{ padding: "8px", textAlign: "left" }}
              >
                Bid Key
              </th>
              <th
                className="border border-primary bg-primary text-white"
                style={{ padding: "8px", textAlign: "left" }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {bids.length > 0 ? (
              bids.map((bid, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {bid.key}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {bid.count}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>-</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>-</td>
              </tr>
            )}
          </tbody>
        </table>
        <p>
          <strong>Total:</strong> {totalBids}
        </p>
        <p>
        <strong>Total Amount:</strong> {totalCount}
        </p>
      </div>
    );
  });
  BidTable.displayName = "BidTable";
  const handleSingleBidCopy = (game: game) => {
    const bidsString =
      game?.bids?.map((bid) => `\n ${bid?.key} - ${bid?.count}`).join("") || "";
    return `**${convertCamelCaseToTitle(
      game?.gameName
    )}**${bidsString}\n Total:- ${game?.bidCount}\n\n`;
  };
  return (
    <>
      <Modal
        closeForm={() => {
          setMarket(undefined);
          setDeclareGameBid(undefined);
          reset();
        }}
        isOpen={!!market}
        modalTitle={
          declareGameBid
            ? `Declare result for  ${declareGameBid?.gameName}`
            : `Bid for game ${market?.marketName}`
        }
        className="w-full md:w-[450px] max-h-[88vh]  overflow-y-auto"
      >
        <>
          <section className="flex flex-col flex-wrap justify-center md:flex-row gap-5">
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
              className="bg-slate-100 font-semibold"
            >
              <CopyAllOutlined /> Copy all bids
            </Button>
          </section>
          <div className="text-primary w-full mt-4">
            <label>Select Date</label>
            <DatePicker
              showTodaysDate
              onSelect={(date) => {
                if (date) {
                  const localDate = new Date(
                    date.setMinutes(
                      date.getMinutes() - date.getTimezoneOffset()
                    )
                  );
                  setSelectedDate(localDate);
                }
              }}
              selected={selectedDate}
              className="h-11"
            />
          </div>
          <div className="text-primary w-full mt-4">
            <p>
              <strong>Total Bid Amount:</strong> {totalCount}
            </p>
          </div>
          {declareGameBid && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-5"
            >
              <Textinput
                name="bidDigit"
                required
                control={control}
                register={register}
                label="Bid digit"
                placeholder=""
                type="number"
                classLabel="mb-2 text-slate-500 !text-sm"
                className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
                error={errors.bidDigit}
                onChange={() => clearErrors("bidDigit")}
              />
              <Textinput
                name="winAmount"
                required
                register={register}
                label="Win amount"
                placeholder=""
                type="number"
                classLabel="mb-2 text-slate-500 !text-sm"
                className="w-full h-[36px] bg-slate-100 rounded-md  px-2 border border-primary selection:bg-transparent"
                error={errors.winAmount}
                onChange={() => clearErrors("winAmount")}
              />
              <section className="flex gap-5">
                <Button variant="contained" type="submit" className="mt-5">
                  Declare result
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  className="mt-5"
                  onClick={() => {
                    setDeclareGameBid(undefined);
                    reset();
                  }}
                >
                  Cancel
                </Button>
              </section>
            </form>
          )}
          {/* {marketDetails?.games && (
            <div className="flex flex-wrap gap-10 justify-center md:justify-between `">
              {marketDetails?.games.map((game) => (
                <div
                  key={game?.id}
                  className="flex md:flex-col items-center text-center md:m-3 xl:m-2 w-full md:w-52 bg-primary/90 px-5 py-2 rounded-lg text-white  justify-between drop-shadow-2xl shadow-2xl  "
                >
                  <div className="text-lg break-words w-full">
                    {convertCamelCaseToTitle(game?.gameName)}
                  </div>
                  <span className="font-semibold md:mt-2 text-2xl">
                    {game?.bidCount}
                  </span>
                  {marketDetails?.games && (
                    <CopyButton textToCopy={handleSingleBidCopy(game)} />
                  )}
                </div>
              ))}
            </div>
          )} */}
          {marketDetails?.games && (
            <div className="flex flex-col w-full   ">
              {marketDetails?.games.map((game) => (
                <div
                  key={game?.id}
                  className="flex flex-col items-center text-center md:m-3 xl:m-2 w-full  px-5 py-2 rounded-lg text-slate-900  justify-between border   "
                >
                  <div className="text-lg break-words w-full font-bold">
                    {convertCamelCaseToTitle(game?.gameName)}
                  </div>

                  {marketDetails?.games && (
                    <CopyButton textToCopy={handleSingleBidCopy(game)} />
                  )}
                  <BidTable game={game} />
                </div>
              ))}
            </div>
          )}
        </>
      </Modal>
    </>
  );
};

export default MarketBidModal;
