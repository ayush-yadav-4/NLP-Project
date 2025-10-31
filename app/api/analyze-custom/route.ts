import { type NextRequest, NextResponse } from "next/server"
import { analyzeTweets } from "@/lib/nlp-service"

export async function POST(request: NextRequest) {
  try {
    const { username, tweets } = await request.json()

    if (!username || !tweets || tweets.length === 0) {
      return NextResponse.json({ error: "Username and tweets are required" }, { status: 400 })
    }

    // Convert tweets to the expected format
    const formattedTweets = tweets.map((tweet: string, index: number) => ({
      text: tweet,
      created_at: new Date(Date.now() - index * 86400000).toISOString(),
      id: `custom_${index}`
    }))

    // Analyze custom tweets with enhanced NLP
    const analysis = await analyzeTweets(formattedTweets, username)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ 
      error: "Analysis failed", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 })
  }
}
