// app/api/fetch-external-results/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST() {
  try {
    const response = await axios.post("https://sboss.fun/test.php", {
      server_ip: "194.163.35.237",
      data: [],
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching from third-party API:", error.message);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
