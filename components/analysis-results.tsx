"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, MessageSquare, Loader2 } from "lucide-react"
import { SentimentChart } from "./sentiment-chart"
import { IdeologyRadar } from "./ideology-radar"
import { ThemeToggle } from "./theme-toggle"

interface AnalysisResult {
  username: string
  displayName: string
  tweetsAnalyzed: number
  overallSentiment: {
    positive: number
    neutral: number
    negative: number
    emotionalTone: string
    confidence: number
    emotionalKeywords: string[]
  }
  ideology: {
    progressive: number
    conservative: number
    neutral: number
  }
  mindsetProfile: {
    category: string
    description: string
    score: number
  }
  topThemes: string[]
  topicAnalysis?: { topic: string; confidence: number; frequency: number; category: string }[]
  interestAnalysis?: { category: string; keywords: string[]; score: number; description: string }[]
  personalityTraits?: { trait: string; score: number; description: string; evidence: string[] }[]
  communicationPatterns?: {
    writingStyle: string
    formality: number
    engagement: number
    questionFrequency: number
    exclamationFrequency: number
    hashtagUsage: number
    mentionFrequency: number
    avgTweetLength: number
    readabilityScore: number
  }
  riskFactors: string[]
  recommendation: string
  hirability: number
  geminiInsights?: string
  conversationTopics?: string[]
}

interface AnalysisResultsProps {
  results: AnalysisResult
  onReset: () => void
}

export function AnalysisResults({ results, onReset }: AnalysisResultsProps) {
  const [interviewQuestions, setInterviewQuestions] = useState<{ questions: string[]; categories: string[] } | null>(null)
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  
  const hireabilityColor =
    results.hirability >= 70 ? "text-green-500" : results.hirability >= 40 ? "text-yellow-500" : "text-red-500"

  const generateInterviewQuestions = async () => {
    setIsGeneratingQuestions(true)
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysisData: results,
          username: results.username
        })
      })
      
      if (response.ok) {
        const questions = await response.json()
        setInterviewQuestions(questions)
      } else {
        console.error('Failed to generate interview questions')
      }
    } catch (error) {
      console.error('Error generating interview questions:', error)
    } finally {
      setIsGeneratingQuestions(false)
    }
  }

  const downloadReport = async () => {
    setIsDownloading(true)
    try {
      // Create a comprehensive report
      const reportData = {
        candidate: {
          username: results.username,
          displayName: results.displayName,
          tweetsAnalyzed: results.tweetsAnalyzed,
        },
        analysis: {
          sentiment: results.overallSentiment,
          ideology: results.ideology,
          mindsetProfile: results.mindsetProfile,
          communicationPatterns: results.communicationPatterns,
          interests: results.interestAnalysis,
          personalityTraits: results.personalityTraits,
          topics: results.topicAnalysis,
          themes: results.topThemes,
          riskFactors: results.riskFactors,
          recommendation: results.recommendation,
          hirability: results.hirability,
          geminiInsights: results.geminiInsights,
          conversationTopics: results.conversationTopics,
        },
        interviewQuestions: interviewQuestions,
        generatedAt: new Date().toISOString(),
      }

      // Convert to JSON and create blob
      const jsonString = JSON.stringify(reportData, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      
      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `candidate-analysis-${results.username}-${new Date().toISOString().split('T')[0]}.json`
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading report:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Analysis Results</h2>
          <p className="text-muted-foreground">@{results.username}</p>
        </div>
        <div className="flex gap-2">
          <ThemeToggle />
          <Button onClick={downloadReport} disabled={isDownloading}>
            {isDownloading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            {isDownloading ? 'Downloading...' : 'Download Report'}
          </Button>
          <Button onClick={onReset} variant="outline" className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            New Analysis
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="text-sm text-muted-foreground mb-2">Tweets Analyzed</div>
          <div className="text-3xl font-bold text-foreground">{results.tweetsAnalyzed}</div>
        </Card>
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="text-sm text-muted-foreground mb-2">Hirability Score</div>
          <div className={`text-3xl font-bold ${hireabilityColor}`}>{results.hirability}%</div>
        </Card>
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="text-sm text-muted-foreground mb-2">Mindset Profile</div>
          <div className="text-lg font-bold text-foreground">{results.mindsetProfile.category}</div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">Sentiment Analysis</h3>
          <SentimentChart data={results.overallSentiment} />
        </Card>
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">Ideology Spectrum</h3>
          <IdeologyRadar data={results.ideology} />
        </Card>
      </div>

      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">Mindset Profile</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{results.mindsetProfile.category}</span>
              <span className="text-sm font-bold text-primary">{results.mindsetProfile.score}%</span>
            </div>
            <div className="w-full bg-border/30 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                style={{ width: `${results.mindsetProfile.score}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{results.mindsetProfile.description}</p>
        </div>
      </Card>

      {/* Enhanced Sentiment Analysis */}
      <Card className="p-6 border-border/50 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <h3 className="text-lg font-semibold text-foreground mb-4">Advanced Sentiment Analysis</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Emotional Tone</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {results.overallSentiment.emotionalTone}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              Confidence: {results.overallSentiment.confidence}%
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Positive</span>
                <span className="font-medium text-green-600">{results.overallSentiment.positive}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Neutral</span>
                <span className="font-medium text-gray-600">{results.overallSentiment.neutral}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Negative</span>
                <span className="font-medium text-red-600">{results.overallSentiment.negative}%</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Emotional Keywords</h4>
            <div className="flex flex-wrap gap-1">
              {results.overallSentiment.emotionalKeywords.slice(0, 8).map((keyword, i) => (
                <Badge key={i} variant="secondary" className="text-xs">{keyword}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Communication Patterns */}
      {results.communicationPatterns && (
        <Card className="p-6 border-border/50 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <h3 className="text-lg font-semibold text-foreground mb-4">Communication Analysis</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <div className="text-2xl font-bold text-foreground">{results.communicationPatterns.writingStyle}</div>
              <div className="text-sm text-muted-foreground">Writing Style</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <div className="text-2xl font-bold text-foreground">{results.communicationPatterns.formality}%</div>
              <div className="text-sm text-muted-foreground">Formality Level</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <div className="text-2xl font-bold text-foreground">{results.communicationPatterns.engagement}%</div>
              <div className="text-sm text-muted-foreground">Engagement</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Questions per Tweet</span>
                <span className="font-medium">{results.communicationPatterns.questionFrequency}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Exclamations per Tweet</span>
                <span className="font-medium">{results.communicationPatterns.exclamationFrequency}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Hashtag Usage</span>
                <span className="font-medium">{results.communicationPatterns.hashtagUsage}%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mention Frequency</span>
                <span className="font-medium">{results.communicationPatterns.mentionFrequency}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg Tweet Length</span>
                <span className="font-medium">{results.communicationPatterns.avgTweetLength} chars</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Readability Score</span>
                <span className="font-medium">{results.communicationPatterns.readabilityScore}/100</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Enhanced Interest Analysis */}
      {results.interestAnalysis && results.interestAnalysis.length > 0 && (
        <Card className="p-6 border-border/50 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <h3 className="text-lg font-semibold text-foreground mb-4">Interest Areas Analysis</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {results.interestAnalysis.slice(0, 6).map((interest, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{interest.category}</span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    {interest.score}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{interest.description}</p>
                <div className="flex flex-wrap gap-1">
                  {interest.keywords.slice(0, 4).map((keyword, j) => (
                    <Badge key={j} variant="outline" className="text-xs">{keyword}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Enhanced Personality Traits */}
      {results.personalityTraits && results.personalityTraits.length > 0 && (
        <Card className="p-6 border-border/50 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20">
          <h3 className="text-lg font-semibold text-foreground mb-4">Personality Traits Analysis</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {results.personalityTraits.slice(0, 6).map((trait, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{trait.trait}</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                    {trait.score}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{trait.description}</p>
                <div className="space-y-1">
                  <h5 className="text-xs font-medium text-foreground">Evidence:</h5>
                  <div className="flex flex-wrap gap-1">
                    {trait.evidence.slice(0, 3).map((evidence, j) => (
                      <Badge key={j} variant="outline" className="text-xs">{evidence}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Enhanced Topic Analysis */}
      {results.topicAnalysis && results.topicAnalysis.length > 0 && (
        <Card className="p-6 border-border/50 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20">
          <h3 className="text-lg font-semibold text-foreground mb-4">Topic Analysis</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {results.topicAnalysis.slice(0, 8).map((topic, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{topic.topic}</span>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                      {topic.confidence}%
                    </Badge>
                    <Badge variant="secondary" className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                      {topic.frequency}x
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{topic.category}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Themes</h3>
          <div className="space-y-2">
            {results.topThemes.map((theme, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded bg-background/50">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground">{theme}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">Risk Factors</h3>
          <div className="space-y-2">
            {results.riskFactors.length > 0 ? (
              results.riskFactors.map((factor, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded bg-destructive/10">
                  <div className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-sm text-foreground">{factor}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No significant risk factors detected</p>
            )}
          </div>
        </Card>
      </div>

      {/* Interview Questions Section */}
      <Card className="p-6 border-border/50 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-blue-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Interview Questions</h3>
          <Button 
            onClick={generateInterviewQuestions} 
            disabled={isGeneratingQuestions}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            {isGeneratingQuestions ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MessageSquare className="w-4 h-4" />
            )}
            {isGeneratingQuestions ? 'Generating...' : 'Generate Questions'}
          </Button>
        </div>
        
        {interviewQuestions ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              AI-generated questions tailored to this candidate's profile and interests:
            </p>
            <div className="grid gap-4">
              {interviewQuestions.questions.map((question, i) => (
                <div key={i} className="p-4 rounded bg-background/50 border border-border/30">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1 text-xs">
                      {interviewQuestions.categories[i] || 'General'}
                    </Badge>
                    <p className="text-sm text-foreground flex-1">{question}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Click "Generate Questions" to create personalized interview questions based on this candidate's analysis.
          </p>
        )}
      </Card>

      <Card className="p-6 border-border/50 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border-primary/20">
        <h3 className="text-lg font-semibold text-foreground mb-3">Recommendation</h3>
        <p className="text-foreground mb-4">{results.recommendation}</p>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Download className="w-4 h-4" />
          Download Report
        </Button>
      </Card>
    </div>
  )
}
