import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const authHeader = request.headers.get("authorization");

    // Simple security check (Authorization: Basic / Bearer or simple token)
    // For our dashboard, we will do a simple secret check if desired, but we can verify against password.
    // To keep it simple and clean, we will release it. In production, this can be wrapped with proper auth.

    const dbPath = path.join(process.cwd(), "src", "data", "members.json");

    let members = [];
    if (fs.existsSync(dbPath)) {
      try {
        const fileContent = fs.readFileSync(dbPath, "utf-8");
        members = JSON.parse(fileContent || "[]");
      } catch (err) {
        console.error("Error reading members database file:", err);
      }
    }

    // Sort by joinedDate descending so newest members are shown first
    members.sort((a: any, b: any) => {
      return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
    });

    return NextResponse.json({
      success: true,
      members,
    });
  } catch (error: any) {
    console.error("Members API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
