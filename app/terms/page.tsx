import { Logo } from "@/components/ui/logo"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[720px] px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Logo size={28} />
          <span className="font-semibold">ScienceMaterial</span>
        </div>
        <h1 className="text-[28px] font-semibold tracking-[-0.02em]">Terms of Service</h1>
        <div className="mt-6 space-y-6 text-[14px] leading-[1.7] tracking-[-0.01em] text-ink-muted">
          <p>ScienceMaterial is an independent educational resource. Curriculum reconstructed from source materials for learning purposes.</p>
          <h3 className="text-ink font-semibold text-[15px]">Educational Use</h3>
          <p>Content is Chinese (中文), UI English. Experiments are interactive simulations for learning.</p>
          <h3 className="text-ink font-semibold text-[15px]">No Warranty</h3>
          <p>Provided as-is. No warranty for exam outcomes. Verify with official textbooks.</p>
        </div>
        <footer className="mt-12 pt-6 border-t border-border/50 text-[11px] font-mono text-ink-muted">© 2026 ScienceMaterial</footer>
      </div>
    </div>
  )
}
