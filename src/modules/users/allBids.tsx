import { useEffect, useState } from "react";
import { CommonTable } from "@/components/commonTable";
import { allBidsColumns } from "./constants/allBidsColumn";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
const AllBids = ({ txnUserId }: { txnUserId?: number | undefined }) => {
  const [withdrawData, setWithdrawData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionId, setActionId] = useState<any>();

  const onSuccess = (data: any) => {
    setWithdrawData({
      data: data.result.bidHistory,
      pagination: data.result.pagination,
    });
    setLoading(false);
  };

  const {
    data: dropDownData,
    isError: dropDownListError,
    isLoading: dropDownListLoading,
    fetchData,
  } = useAxiosGet(
    `/bid/bid-history?userId=${txnUserId}&page=${page}&limit=100000000000000`,
    onSuccess
  );

  useEffect(() => {
    fetchData();
  }, [page]);
  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center"></div>
    );
  }

  return (
    <CommonTable
      columns={allBidsColumns({})}
      data={withdrawData}
      isLoading={dropDownListLoading}
      page={page}
      setPage={setPage}
    />
  );
};

export default AllBids;
