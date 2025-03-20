import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import AddEditUserForm from "./addEditForm";
import { CommonTable } from "@/components/commonTable";
import { Modal } from "@/components/common/modal";
import { useEffect, useState } from "react";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
import { getUsersColumns } from "./constants/userListColumns";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AddUserData, EditUserDetails, UserStatus } from "./types";
import useAxiosPost from "../../../hooks/axios/useAxiosPost";
import useAxiosDelete from "../../../hooks/axios/useAxiosDelete";
import CommonAlert from "@/components/common/alert";
import EditUserDetailsForm from "./editUserDetails";
import UserTxnHistory from "./userTxnHistory";
import AllBids from "./allBids";
import AllWinningBids from "./allWinningBids";
import { useSearchParams } from "next/navigation";
import React from "react";
const UsersModule = () => {
  const [openForm, setOpenFrom] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [userStatus, setUserStatus] = useState<{
    id: number;
    status: string;
  }>();
  const [openDetailUser, setOpenDetailUser] = useState<EditUserDetails>();
  const [deductAmountForUserID, setDeductAmountForUserID] = useState<number>();
  const [addAmountForUserID, setAddAmountForUserID] = useState<number>();
  const [deleteUserId, setDeleteUserId] = useState<number>();
  const [txnHistoryId, setTxnHistoryId] = useState<number>();
  const [userIdForAllBid, SetUserIdForAllBid] = useState<number>();
  const [userIdForWinningBid, SetUserIdForWinningBid] = useState<number>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] = useState<string | number>(5);

  const searchParams = useSearchParams();
  const today = searchParams.get("today");
  const wallet = searchParams.get("wallet");
  const {
    data: listData,
    isLoading: userListLoading,
    fetchData,
  } = useAxiosGet(
    `/user/get-all-users?page=${page || 1}&limit=${
      pagination === "All" ? "1000000000" : pagination || 10
    }&status=${userStatus?.status ?? ""}&searchParams=${searchTerm ?? ""}&${
      today ? "today=true" : ""
    }&${wallet ? "wallet=true" : ""}`
  );

  const { post } = useAxiosPost(`/user/add-user-by-admin`);

  const { post: editUserDetails } = useAxiosPost(`/user/update-user-by-admin`);

  const { Delete } = useAxiosDelete(
    `user/delete-user-by-admin/${deleteUserId}`
  );

  const onSubmit = async (data: AddUserData) => {
    const res = await post(data);
    if (res && res?.success) {
      setOpenFrom(false);
      await fetchData();
    }
  };

  const updateUserDetails = async (data: EditUserDetails) => {
    let res;
    if (openDetailUser) {
      res = await editUserDetails({
        ...data,
      });
    }
    if (deductAmountForUserID) {
      res = await editUserDetails({
        subWallet: data?.subWallet,
        userId: deductAmountForUserID,
      });
    }
    if (addAmountForUserID) {
      res = await editUserDetails({
        addWallet: data?.addWallet,
        userId: addAmountForUserID,
      });
    }
    if (res && res?.success) {
      setOpenDetailUser(undefined);
      setAddAmountForUserID(undefined);
      setDeductAmountForUserID(undefined);
      setTxnHistoryId(undefined);
      SetUserIdForAllBid(undefined);
      SetUserIdForWinningBid(undefined);
      await fetchData();
    }
  };
  const handleUserStatusChange = async () => {
    if (userStatus?.id && userStatus?.status) {
      const changeStatus =
        userStatus?.status === UserStatus.Active
          ? UserStatus.Inactive
          : UserStatus.Active;
      const res = await editUserDetails({
        status: changeStatus,
        userId: userStatus?.id,
      });
      if (res && res?.success) {
        setUserStatus(undefined);
        await fetchData();
      }
    }
  };

  const handleUserDelete = async () => {
    const res = await Delete({});
    if (res && res?.success) {
      setDeleteUserId(undefined);
      await fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchTerm, pagination]);

  const closeForm = () => {
    setOpenFrom(false);
  };
  const closeUserDetailsForm = () => {
    setOpenDetailUser(undefined);
  };

  return (
    <PageContainer title="Users" description="this is users management">
      <Grid container spacing={3}>
        <Grid
          item
          sm={12}
          className="max-w-[88vw] md:max-w-[95vw] lg:max-w-[78vw]"
        >
          <DashboardCard title="Users">
            <>
              <div className="flex w-full justify-between">
                <input
                  type="text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  min="1"
                  max="100"
                  className="w-48 h-10 rounded-lg border border-gray-300 p-2 bg-white"
                />
                <LoadingButton
                  color="primary"
                  variant="contained"
                  aria-label="logout"
                  size="medium"
                  sx={{ width: "150px" }}
                  type="button"
                  onClick={() => setOpenFrom(true)}
                >
                  Add user
                </LoadingButton>
              </div>
              <CommonAlert
                showModal={!!deleteUserId}
                AlertDiaogTitle="Confirm delete user"
                title="Are you sure,you want to delete user"
                description="Once user is deleted it cannot be undone"
                ButtonText="Delete"
                onContinue={handleUserDelete}
                onCancel={() => {
                  setDeleteUserId(undefined);
                }}
                titleClassName="text-center"
                contentClassName="w-full flex-col flex justify-center items-center gap-8"
                descriptionclassName="text-black"
              />
              <Modal
                isOpen={openForm}
                modalTitle="Add a new user"
                closeForm={closeForm}
                className="w-[600px]  max-h-[80vh] overflow-y-auto"
              >
                <AddEditUserForm
                  setOpenFrom={setOpenFrom}
                  onSubmit={onSubmit}
                />
              </Modal>
              {!!openDetailUser && (
                <Modal
                  isOpen={!!openDetailUser}
                  modalTitle="Edit user details"
                  closeForm={closeUserDetailsForm}
                  className="w-[600px]  max-h-[80vh] overflow-y-auto"
                >
                  <EditUserDetailsForm
                    openDetailUser={openDetailUser}
                    setOpenFrom={setOpenDetailUser}
                    onSubmit={updateUserDetails}
                  />
                </Modal>
              )}

              {!!deductAmountForUserID && (
                <Modal
                  isOpen={!!deductAmountForUserID}
                  modalTitle="Deduct amount from user's wallet"
                  closeForm={() => {
                    setDeductAmountForUserID(undefined);
                  }}
                  className="w-[600px]  max-h-[80vh] overflow-y-auto"
                >
                  <EditUserDetailsForm
                    deductAmountForUserID={deductAmountForUserID}
                    openDetailUser={openDetailUser}
                    setOpenFrom={setOpenDetailUser}
                    onSubmit={updateUserDetails}
                  />
                </Modal>
              )}
              {!!addAmountForUserID && (
                <Modal
                  isOpen={!!addAmountForUserID}
                  modalTitle="Add amount to user's wallet"
                  closeForm={() => {
                    setAddAmountForUserID(undefined);
                  }}
                  className="w-[600px]  max-h-[80vh] overflow-y-auto"
                >
                  <EditUserDetailsForm
                    addAmountForUserID={addAmountForUserID}
                    openDetailUser={openDetailUser}
                    setOpenFrom={setOpenDetailUser}
                    onSubmit={updateUserDetails}
                  />
                </Modal>
              )}
              {!!userIdForAllBid && (
                <Modal
                  isOpen={!!userIdForAllBid}
                  modalTitle="User All Bids"
                  closeForm={() => {
                    SetUserIdForAllBid(undefined);
                  }}
                  className="w-[600px]  max-h-[80vh] overflow-y-auto"
                >
                  <AllBids txnUserId={userIdForAllBid} />
                </Modal>
              )}
              {!!userIdForWinningBid && (
                <Modal
                  isOpen={!!userIdForWinningBid}
                  modalTitle="User All Winning Bids"
                  closeForm={() => {
                    SetUserIdForWinningBid(undefined);
                  }}
                  className="w-[600px]  max-h-[80vh] overflow-y-auto"
                >
                  <AllWinningBids txnUserId={userIdForWinningBid} />
                </Modal>
              )}
              {!!txnHistoryId && (
                <Modal
                  isOpen={!!txnHistoryId}
                  modalTitle="User Activity Details"
                  closeForm={() => {
                    setTxnHistoryId(undefined);
                  }}
                  className="w-[600px]  max-h-[80vh] overflow-y-auto"
                >
                  <UserTxnHistory txnUserId={txnHistoryId} />
                </Modal>
              )}
              <CommonAlert
                showModal={!!userStatus}
                AlertDiaogTitle={`Confirm ${
                  userStatus?.status === UserStatus.Active
                    ? "deactivate"
                    : "activate"
                }  user`}
                title={`Are you sure,you want to ${
                  userStatus?.status === UserStatus.Active
                    ? "deactivate"
                    : "activate"
                } user`}
                description=""
                ButtonText={`${
                  userStatus?.status === UserStatus.Active
                    ? "Deactivate"
                    : "Activate"
                }`}
                onContinue={handleUserStatusChange}
                onCancel={() => {
                  setUserStatus(undefined);
                }}
                titleClassName="text-center"
                contentClassName="w-full flex-col flex justify-center items-center gap-8 "
                descriptionclassName="text-black"
              />
              <CommonTable
                columns={getUsersColumns({
                  setDeleteUserId,
                  setOpenDetailUser,
                  setDeductAmountForUserID,
                  setAddAmountForUserID,
                  setUserStatus,
                  setTxnHistoryId,
                  SetUserIdForAllBid,
                  SetUserIdForWinningBid
                })}
                setPagination={setPagination}
                pagination={pagination}
                data={{
                  data: listData?.result?.users,
                  pagination: listData?.result?.pagination,
                }}
                isLoading={userListLoading}
                page={page}
                setPage={setPage}
              />
            </>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UsersModule;
