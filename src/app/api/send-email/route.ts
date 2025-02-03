import { GenerateVerificationCodeUseCase } from '@/application/auth/usecases/GenerateVerificationCodeUseCase';
import { SendEmailUseCase } from '@/application/auth/usecases/SendEmailUseCase';
import { SMTPEmailService } from "@/utils/email/SMTPEmailService";
import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest) {

    try {
        const {email} = await req.json();
       

        if (!email) {
            return NextResponse.json({error:"Missing required fields"}, {status: 400});
        }

        const emailService = new SMTPEmailService();
        const generateVerificationCodeUseCase = new GenerateVerificationCodeUseCase();
        const sendEmailUseCase = new SendEmailUseCase(emailService, generateVerificationCodeUseCase);

        await sendEmailUseCase.execute(email);

        return NextResponse.json({message: "Email sent successfully."}, {status: 200});

    } catch (error) {
        console.error("Email send Error", error);
        return NextResponse.json({error: "Internal Server Error"},{status:500});
    }
}
