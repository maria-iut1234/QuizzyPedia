import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Quiz from "../../../models/quiz";

// save quiz
export async function POST(request) {
  try {
    const { name, questions } = await request.json();

    if (!name || !questions || !Array.isArray(questions)) {
      return NextResponse.error("Invalid request: name and questions array are required", { status: 400 });
    }

    await connectMongoDB();

    const quiz = new Quiz({
      name,
      questions,
    });

    await quiz.save();

    return NextResponse.json(
      { message: "Quiz saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving quiz:", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
