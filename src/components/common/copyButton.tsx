import { ContentCopyOutlined, DoneOutlined } from "@mui/icons-material";
import React, { useState, useRef } from "react";

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      // Reset the copied state after 1 second
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    });
  };

  return (
    <div className="flex justify-center">
      <button onClick={handleCopy} className="flex items-center ">
        {isCopied ? (
          <span role="img" aria-label="Copied">
            <DoneOutlined sx={{ width: "15px" }} />
          </span> // Change to your desired copied icon
        ) : (
          <span role="img" aria-label="Copy">
            <ContentCopyOutlined sx={{ width: "15px" }} />
          </span> // Change to your desired copy icon
        )}
      </button>
    </div>
  );
};

export default CopyButton;
