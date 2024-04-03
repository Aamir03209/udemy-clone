import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();
    // console.log(userId,courseId,values)
    if (!userId) return new NextResponse("Unauthorized User", { status: 401 });
    const course = await db.course.update({
        where: {
          id: courseId,
          userId
        },
        data: {
          ...values,
        }
      });
      return new NextResponse(JSON.stringify(course),{status:200})
  } catch (error) {
    console.log("[COURSEID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
