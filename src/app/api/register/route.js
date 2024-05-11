import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import User from "../../../models/user";
import bcrypt from "bcrypt";

// User sign up
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Validate request data
    if (!name || !email || !password) {
      return NextResponse.error(
        "Invalid request: name, email, and password are required",
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    console.log(existingUser);
    if (existingUser) {
      return NextResponse.error("User already exists", { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User signed up successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error signing up:", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
