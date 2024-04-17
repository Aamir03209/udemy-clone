import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
     console.log(userId, "*****");
    if (!userId) {
        console.log("coming","****")
      return new NextResponse("unauthorized", { status: 401 });
    }
   console.log("coming")
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });
    if (!course) {
      return new NextResponse("Not Found", { status: 401 });
    }
    const hasPublishedChapters = course.chapters.some(
      (chapter) => chapter.isPublished
    );
    if (!course.title || !course.description || !hasPublishedChapters) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    console.log(hasPublishedChapters);
    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });
    console.log(publishedCourse);
    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("[COURSE_PUBLISHED]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
