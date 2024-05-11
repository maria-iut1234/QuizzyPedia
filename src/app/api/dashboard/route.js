import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Quiz from "../../../models/quiz";

export async function GET(req) {
  try {
    await connectMongoDB();

    const searchParams = req.nextUrl.searchParams;
    const pageNumber = parseInt(searchParams.get("pageNumber"), 10) || 1;
    const quizzesPerPage =
      parseInt(searchParams.get("quizzesPerPage"), 10) || 4;

    const skip = (parseInt(pageNumber) - 1) * parseInt(quizzesPerPage);

    const quizzes = await Quiz.find()
      .skip(skip)
      .limit(parseInt(quizzesPerPage));

    const totalQuizzes = await Quiz.countDocuments();

    return NextResponse.json(
      {
        quizzes,
        totalQuizzes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting quizzes:", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
