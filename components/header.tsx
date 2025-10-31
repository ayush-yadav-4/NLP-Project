export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">AI</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">MindCheck</h1>
            <p className="text-xs text-muted-foreground">Candidate Intelligence Platform</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            History
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Settings
          </a>
        </nav>
      </div>
    </header>
  )
}
