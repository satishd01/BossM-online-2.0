"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextTopLoader from "nextjs-toploader";
import "./global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader
          color="#0085db"
          initialPosition={0.5}
          crawlSpeed={400}
          height={3}
          crawl={true}
          showSpinner={true}
        />
        <ThemeProvider theme={baselightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
          <ToastContainer
            className="absolute z-[9999999999]"
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={true}
            closeOnClick={true}
            draggable={false}
            theme="light"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
