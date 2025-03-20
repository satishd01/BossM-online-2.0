import { useState } from "react";
import axiosInstance from "./axiosInstance";

const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFiles = async (formData: FormData) => {
    try {
      setIsUploading(true);
      setError(null);

      const response = await axiosInstance.post(
        "/patient-management/upload-files",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (err) {
      setError("Error uploading files.");
      console.error("Upload error:", err);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFiles, isUploading, error };
};

export default useFileUpload;
