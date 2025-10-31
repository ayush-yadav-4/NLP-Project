import { type NextRequest, NextResponse } from "next/server"
import { extractTwitterHandle, fetchTweets, analyzeTweets } from "@/lib/nlp-service"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Extract Twitter handle from URL
    const handle = extractTwitterHandle(url)
    if (!handle) {
      return NextResponse.json({ error: "Invalid Twitter/X URL" }, { status: 400 })
    }

    // Fetch tweets using Twitter API
    const tweets = await fetchTweets(handle)

    if (tweets.length === 0) {
      return NextResponse.json({ error: "No tweets found for this user" }, { status: 404 })
    }

    // Analyze tweets with enhanced NLP
    const analysis = await analyzeTweets(tweets, handle)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ 
      error: "Analysis failed", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 })
  }
}
