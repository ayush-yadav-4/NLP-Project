import { AnalysisForm } from "@/components/analysis-form"
import { Header } from "@/components/header"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <AnalysisForm />
      </div>
    </main>
  )
}
