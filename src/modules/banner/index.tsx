"use client";
import { Grid } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { bufferToBase64 } from "@/utils";
import useAxiosPost from "../../../hooks/axios/useAxiosPost";
import Image from "next/image";
import axiosInstance from "../../../hooks/axios/axiosInstance";

const BannerComponent = () => {
  const { data: bannerData, post } = useAxiosPost(`/dashboard/get-banner`);

  const { data: updatedBanner, post: updateBanner } = useAxiosPost(
    `/dashboard/update-banner/1`
  );

  const [banner, setBanner] = useState<string | null>(null);
  useEffect(() => {
    setBannerData();
  }, []);

  const setBannerData = async () => {
    const { result } = await post({});
    if (result && result?.fileData) {
      const fileData = result.fileData?.data;
      const base64Image = fileData ? bufferToBase64(fileData) : null;
      setBanner(base64Image);
    }
  };
  const handleClick = () => {
    document?.getElementById("gameImage")?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      const response = await fetch(url);
      const gameImage = await response.blob();

      const formData = new FormData();

      formData.append("files", gameImage);

      const res = await axiosInstance.post(
        "/dashboard/update-banner/1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res && res?.data?.success) {
        setBannerData();
      }
    }
  };
  return (
    <PageContainer title="Banner" description="this is Banner page">
      <Grid container spacing={3}>
        <Grid item sm={12} className="max-w-[88vw] ">
          <DashboardCard title="Banner">
            <div className="w-full flex justify-center">
              {banner && (
                <div className="relative group object-cover ">
                  {/* Image */}
                  <Image
                    src={banner}
                    width={1000}
                    height={1000}
                    alt="banner"
                    className=" h-full object-cover w-[400px]"
                  />
                  <input
                    hidden
                    id="gameImage"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />

                  {/* Button that appears on hover */}
                  <button
                    type="button"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-400 rounded-full p-4"
                    onClick={handleClick}
                  >
                    Upload Image
                  </button>
                </div>
              )}
            </div>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default BannerComponent;
