import { SbSmalltalkRepository } from "@/infrastructure/repositories/SbSmalltalkSubjectRepository";
import { NextResponse } from "next/server";


export async function GET() {
  try{
    const repository = new SbSmalltalkRepository();
    const subjects = await repository.findAll();

    return NextResponse.json({data: subjects}, {status:200})
  }
  catch(err){
    return NextResponse.json({error: "Failed to fetch"}, {status:500});
  }
}