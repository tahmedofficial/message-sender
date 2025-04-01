import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { userName, email, password } = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({ userName, isVerified: true })

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: true,
                message: "Username is already taken",
            }, { status: 400 })
        }

        const existingUserByEmail = await UserModel.findOne({ email })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            true //todo: back hear
        }
        else {
            const hasedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                userName,
                email,
                password: hasedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptionMessage: true,
                messages: []
            })

            await newUser.save();
        }

        const emailResponse = await sendVerificationEmail(
            email,
            userName,
            verifyCode
        )

        if (!emailResponse.success) {
            return Response.json({
                success: true,
                message: emailResponse.message,
            }, { status: 500 })
        }


    } catch (error) {
        console.error("Registering user error", error);
        return Response.json({
            success: false,
            message: "Error registering user"
        },
            { status: 500 })
    }

}

