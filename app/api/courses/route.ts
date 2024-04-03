import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    console.log(userId, title);
    if (!userId) return new NextResponse("Unauthorized User", { status: 401 });
    const course = await db.course.create({
      data: {
        userId,
        title,
      }
    });
    return new NextResponse(JSON.stringify(course), { status: 200 });
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
