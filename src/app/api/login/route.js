import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import User from "../../../models/user";
import bcrypt from "bcrypt";

// User login
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate request data
    if (!email || !password) {
      return NextResponse.error(
        "Invalid request: email and password are required",
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.error("User not found", { status: 404 });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.error("Invalid password", { status: 401 });
    }

    // Return user object along with the response
    return NextResponse.json(
      { user, message: "User logged in successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
