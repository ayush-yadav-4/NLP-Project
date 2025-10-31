import { type NextRequest, NextResponse } from "next/server"
import { generateInterviewQuestions } from "@/lib/nlp-service"

export async function POST(request: NextRequest) {
  try {
    const { analysisData, username } = await request.json()

    if (!analysisData || !username) {
      return NextResponse.json({ 
        error: "Analysis data and username are required" 
      }, { status: 400 })
    }

    // Generate interview questions using Gemini AI
    const questions = await generateInterviewQuestions(analysisData, username)

    return NextResponse.json(questions)
  } catch (error) {
    console.error("Interview questions generation error:", error)
    return NextResponse.json({ 
      error: "Failed to generate interview questions", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 })
  }
}
