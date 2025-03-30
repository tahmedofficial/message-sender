import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { userName, email, password } = await request.json();
    } catch (error) {
        console.error("Registering user error", error);
        return Response.json({
            success: false,
            message: "Error registering user"
        },
            { status: 500 })
    }

}

