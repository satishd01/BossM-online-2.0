import { useEffect, useState } from "react";
import { CommonTable } from "@/components/commonTable";
import { txnColumns } from "./constants/txnColumns";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
const UserTxnHistory = ({ txnUserId }: { txnUserId?: number | undefined }) => {
  const [withdrawData, setWithdrawData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionId, setActionId] = useState<any>();

  const onSuccess = (data: any) => {
    setWithdrawData({
      data: data.result.transactions,
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
    `/dashboard/get-activity-history-by-admin/${txnUserId}?page=${page}&limit=10`,
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
      columns={txnColumns({})}
      data={withdrawData}
      isLoading={dropDownListLoading}
      page={page}
      setPage={setPage}
    />
  );
};

export default UserTxnHistory;
