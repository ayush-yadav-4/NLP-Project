"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2, Twitter, History, Plus } from "lucide-react"
import { AnalysisResults } from "./analysis-results"
import { AnalysisHistory } from "./analysis-history"
import { CustomTweetInput } from "./custom-tweet-input"

export function AnalysisForm() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState("")
  const [showHistory, setShowHistory] = useState(false)
  const [showCustomInput, setShowCustomInput] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setResults(null)

    if (!url.trim()) {
      setError("Please enter a Twitter/X profile URL")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const data = await response.json()
      setResults(data)

      const history = JSON.parse(localStorage.getItem("analysisHistory") || "[]")
      history.unshift({
        ...data,
        timestamp: new Date().toISOString(),
      })
      localStorage.setItem("analysisHistory", JSON.stringify(history.slice(0, 50)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (results) {
    return <AnalysisResults results={results} onReset={() => setResults(null)} />
  }

  if (showHistory) {
    return <AnalysisHistory onBack={() => setShowHistory(false)} />
  }

  if (showCustomInput) {
    return (
      <CustomTweetInput
        onBack={() => setShowCustomInput(false)}
        onAnalysisComplete={(data) => {
          setResults(data)
          const history = JSON.parse(localStorage.getItem("analysisHistory") || "[]")
          history.unshift({
            ...data,
            timestamp: new Date().toISOString(),
          })
          localStorage.setItem("analysisHistory", JSON.stringify(history.slice(0, 50)))
        }}
      />
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Analyze Candidate Mindset & Ideology
        </h2>
        <p className="text-lg text-muted-foreground text-balance">
          Extract and analyze tweets to understand a candidate's thought process, values, and professional alignment
        </p>
      </div>

      <Card className="p-8 border border-border/50 bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-semibold text-foreground">
              Twitter/X Profile URL
            </label>
            <div className="relative">
              <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="url"
                type="text"
                placeholder="https://twitter.com/username or https://x.com/username"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10 h-12 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground/50"
                disabled={loading}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enter the public profile URL of the candidate you want to analyze
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Profile...
              </>
            ) : (
              "Start Analysis"
            )}
          </Button>
        </form>
      </Card>

      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        <Button onClick={() => setShowHistory(true)} variant="outline" className="gap-2">
          <History className="w-4 h-4" />
          View Analysis History
        </Button>
        <Button onClick={() => setShowCustomInput(true)} variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          Test with Custom Tweets
        </Button>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm">
          <div className="text-2xl font-bold text-primary mb-2">Real-time</div>
          <p className="text-sm text-muted-foreground">Instant tweet extraction and analysis</p>
        </div>
        <div className="p-6 rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm">
          <div className="text-2xl font-bold text-accent mb-2">Comprehensive</div>
          <p className="text-sm text-muted-foreground">Sentiment, ideology, and mindset insights</p>
        </div>
        <div className="p-6 rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm">
          <div className="text-2xl font-bold text-primary mb-2">Secure</div>
          <p className="text-sm text-muted-foreground">Private analysis with no data retention</p>
        </div>
      </div>
    </div>
  )
}
