import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux({
  // tokenId: "11b4709b-c249-46f9-8060-4e025c2b80cb", // This is the default and can be omitted
  // tokenSecret:"lqYw5WrM1LM54Ou7YX0iqiYCl6Xd4N2203bVz7nVu3lOVtBnnLMX56Md2vYTwDOTVAndzxon2ue", // This is the default and can be omitted
  tokenId: process.env.MUX_TOKEN_ID!, // This is the default and can be omitted
  tokenSecret:process.env.MUX_TOKEN_SECRET!, // This is the default and can be omitted
});
const video= mux.video;
export async function DELETE(req:Request,{params}:{params:{courseId:string}}){
  try {
    const {userId} = auth();
    if(!userId){
      return new NextResponse("Unauthorized",{status:401})
    }
   const course= await db.course.findUnique({
    where:{
      id:params.courseId,
      userId
    },
    include:{
      chapters:{
        include:{
          muxData:true
        }
      }
    }
   });
   if(!course){
    return new NextResponse("Not Found",{status:404})
   }

   for(const chapter of course.chapters){
    if(chapter.muxData?.assetId){
      await video.assets.delete(chapter.muxData.assetId)
    }
   }
   const deletedCourse = await db.course.delete({
    where:{
      id:params.courseId
    }
   });
   return NextResponse.json(deletedCourse)
  } catch (error) {
    console.log("[COURSE_DELETE]",error)
    return new NextResponse("Internal error",{status:500})
  }

}
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
