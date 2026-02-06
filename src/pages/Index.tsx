import HeroSection from "@/components/HeroSection";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-border/50 bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-display font-bold text-sm">R</span>
            </div>
            <span className="font-display font-bold text-foreground text-lg">ResumeIQ</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">AI Career Intelligence</span>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <HeroSection />
    </div>
  );
};

export default Index;
