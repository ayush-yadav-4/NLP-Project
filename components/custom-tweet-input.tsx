"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Loader2, Plus, X } from "lucide-react"
import { AnalysisResults } from "./analysis-results"

interface CustomTweetInputProps {
  onBack: () => void
  onAnalysisComplete: (data: any) => void
}

export function CustomTweetInput({ onBack, onAnalysisComplete }: CustomTweetInputProps) {
  const [username, setUsername] = useState("")
  const [tweets, setTweets] = useState<string[]>([])
  const [currentTweet, setCurrentTweet] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const addTweet = () => {
    if (currentTweet.trim()) {
      setTweets([...tweets, currentTweet.trim()])
      setCurrentTweet("")
    }
  }

  const removeTweet = (index: number) => {
    setTweets(tweets.filter((_, i) => i !== index))
  }

  const handleAnalyze = async () => {
    if (!username.trim() || tweets.length === 0) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/analyze-custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), tweets }),
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const data = await response.json()
      setResults(data)
      onAnalysisComplete(data)
    } catch (error) {
      console.error("Analysis error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (results) {
    return <AnalysisResults results={results} onReset={onBack} />
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button onClick={onBack} variant="ghost" className="mb-6 gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Test with Custom Tweets</h2>
        <p className="text-muted-foreground">Enter a candidate name and their tweets to analyze</p>
      </div>

      <Card className="p-8 border border-border/50 bg-card/50 backdrop-blur-sm space-y-6">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-semibold text-foreground">
            Candidate Name
          </label>
          <Input
            id="username"
            type="text"
            placeholder="e.g., John Doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 bg-background/50 border-border/50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="tweet" className="text-sm font-semibold text-foreground">
            Add Tweets
          </label>
          <div className="flex gap-2">
            <Textarea
              id="tweet"
              placeholder="Enter a tweet or statement..."
              value={currentTweet}
              onChange={(e) => setCurrentTweet(e.target.value)}
              className="min-h-20 bg-background/50 border-border/50"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  addTweet()
                }
              }}
            />
            <Button onClick={addTweet} size="icon" className="h-20">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Press Ctrl+Enter or click + to add tweet</p>
        </div>

        {tweets.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Tweets Added ({tweets.length})</label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {tweets.map((tweet, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-background/50 border border-border/30 flex justify-between items-start gap-2"
                >
                  <p className="text-sm text-foreground flex-1">{tweet}</p>
                  <Button
                    onClick={() => removeTweet(index)}
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={handleAnalyze}
          disabled={loading || !username.trim() || tweets.length === 0}
          className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            `Analyze ${tweets.length} Tweet${tweets.length !== 1 ? "s" : ""}`
          )}
        </Button>
      </Card>
    </div>
  )
}
