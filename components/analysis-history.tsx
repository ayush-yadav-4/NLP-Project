"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Trash2 } from "lucide-react"

interface HistoryItem {
  username: string
  displayName: string
  hirability: number
  timestamp: string
  mindsetProfile: {
    category: string
  }
}

interface AnalysisHistoryProps {
  onBack: () => void
}

export function AnalysisHistory({ onBack }: AnalysisHistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("analysisHistory")
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  const handleDelete = (index: number) => {
    const updated = history.filter((_, i) => i !== index)
    setHistory(updated)
    localStorage.setItem("analysisHistory", JSON.stringify(updated))
  }

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all history?")) {
      setHistory([])
      localStorage.removeItem("analysisHistory")
    }
  }

  const getHireabilityColor = (score: number) => {
    if (score >= 70) return "text-green-500"
    if (score >= 40) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Analysis History</h2>
          <p className="text-muted-foreground">View your previous candidate analyses</p>
        </div>
        <Button onClick={onBack} variant="outline" className="gap-2 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {history.length > 0 && (
        <Button onClick={handleClearAll} variant="destructive" className="gap-2">
          <Trash2 className="w-4 h-4" />
          Clear All History
        </Button>
      )}

      {history.length === 0 ? (
        <Card className="p-12 text-center border-border/50 bg-card/50 backdrop-blur-sm">
          <p className="text-muted-foreground">No analysis history yet. Start by analyzing a candidate profile.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => (
            <Card
              key={index}
              className="p-6 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">@{item.username}</h3>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-xs text-muted-foreground">Mindset Profile</span>
                      <p className="text-sm font-medium text-foreground">{item.mindsetProfile.category}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Hirability Score</span>
                      <p className={`text-sm font-bold ${getHireabilityColor(item.hirability)}`}>{item.hirability}%</p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handleDelete(index)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
