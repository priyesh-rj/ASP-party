import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, fatherName, phone, whatsapp, age, gender, constituency, address, education, occupation } = body;

    // Server-side validation
    if (!name || !phone || !constituency || !address) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate unique Membership ID
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const memberId = `ASP-AN-${randomSuffix}`;
    const joinedDate = new Date().toISOString();

    const newMember = {
      id: memberId,
      name,
      fatherName: fatherName || "",
      phone,
      whatsapp: whatsapp || "",
      age: age || "",
      gender: gender || "",
      constituency,
      address,
      education: education || "",
      occupation: occupation || "",
      joinedDate,
    };

    // File path to local database (src/data/members.json)
    const dbPath = path.join(process.cwd(), "src", "data", "members.json");

    // Read existing file
    let members = [];
    if (fs.existsSync(dbPath)) {
      try {
        const fileContent = fs.readFileSync(dbPath, "utf-8");
        members = JSON.parse(fileContent || "[]");
      } catch (err) {
        console.error("Error reading members database file:", err);
      }
    }

    // Add new member to list
    members.push(newMember);

    // Save back to JSON file
    fs.writeFileSync(dbPath, JSON.stringify(members, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Member registered successfully",
      memberId,
    });
  } catch (error: any) {
    console.error("Join API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
