import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Quiz from "../../../models/quiz";

export async function GET(req) {
  try {
    await connectMongoDB();

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.error("ID parameter is missing", { status: 400 });
    }

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return NextResponse.error("Quiz not found", { status: 404 });
    }

    return NextResponse.json(
      {
        quiz,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting quiz:", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
