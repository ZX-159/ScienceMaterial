"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Maximize2, RotateCcw, Play, Pause, Info } from "lucide-react"
import { getExperimentHTML } from "@/lib/experiments/html"
import { Logo } from "@/components/ui/logo"
import { isFreeExperiment } from "@/lib/access/free-tier"

export function ExperimentFrame({ slug, title }: { slug: string; title: string }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [key, setKey] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [useModularFile, setUseModularFile] = useState(true)
  const [fileExists, setFileExists] = useState<boolean | null>(null)
  const [secureSrc, setSecureSrc] = useState<string>("")

  const html = getExperimentHTML(slug)
  // For free labs, use direct public path (still works, but secure API also works)
  // For non-free, use secure API that checks server-side access
  const isFree = isFreeExperiment(slug)
  const modularSrc = isFree ? `/experiments/${slug}.html` : `/api/experiments/html?slug=${slug}`

  const handleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleReset = () => {
    setKey(k => k + 1)
    iframeRef.current?.contentWindow?.postMessage('reset', '*')
  }

  const handlePause = () => {
    setIsPlaying(!isPlaying)
    iframeRef.current?.contentWindow?.postMessage(isPlaying ? 'pause' : 'resume', '*')
  }

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  useEffect(() => {
    // Check if file exists via secure endpoint
    fetch(modularSrc, { method: 'HEAD' })
      .then(res => {
        // If 403, it's gated - don't show as missing, show as gated (parent handles)
        if (res.status === 403) {
          setFileExists(true)
          setUseModularFile(true)
          setSecureSrc(modularSrc)
          return
        }
        const exists = res.ok
        setUseModularFile(exists)
        setFileExists(exists)
        if (exists) setSecureSrc(modularSrc)
      })
      .catch(() => {
        setUseModularFile(false)
        setFileExists(false)
      })
  }, [modularSrc])

  return (
    <div ref={containerRef} className="relative w-full h-[min(680px,70vh)] lg:h-[min(720px,78vh)] rounded-[16px] overflow-hidden border border-border bg-surface shadow-sm flex flex-col">
      <div className="h-10 min-h-[40px] border-b border-border/60 bg-surface-muted/80 backdrop-blur-xl flex items-center justify-between px-3.5 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <Logo size={20} />
          <span className="ml-1 text-[12px] font-medium tracking-[-0.01em] truncate">{title}</span>
          <span className="text-[11px] font-mono text-ink-muted hidden sm:inline truncate">· ScienceMaterial {isFree && "· Free"}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-[8px]" onClick={handleReset} aria-label="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-[8px]" onClick={handlePause} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-[8px]" onClick={handleFullscreen} aria-label="Fullscreen">
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-[#F6F3EB] relative overflow-hidden">
        {fileExists===false ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#FFFEFB]">
            <div className="max-w-[420px] rounded-[16px] border border-border bg-surface p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3 justify-center">
                <Logo size={20} />
                <span className="text-[11px] font-mono text-ink-muted">ScienceMaterial</span>
              </div>
              <h3 className="text-[16px] font-[600] tracking-[-0.01em] mb-2">Experiment not available</h3>
              <p className="text-[13px] leading-[1.6] text-ink-muted mb-3">This experiment is being prepared. Please try another lab or check back later.</p>
              <div className="text-[11px] text-ink-muted bg-surface-muted border border-border/60 rounded-[10px] p-3 text-left leading-[1.6]">
                <div>• Interactive simulation</div>
                <div>• Drag to explore</div>
                <div>• Real-time data</div>
              </div>
            </div>
          </div>
        ) : useModularFile ? (
          <iframe
            key={key}
            ref={iframeRef}
            src={secureSrc || modularSrc}
            className="w-full h-full border-0 block"
            sandbox="allow-scripts allow-same-origin"
            title={title}
            loading="lazy"
          />
        ) : (
          <iframe
            key={key}
            ref={iframeRef}
            srcDoc={html}
            className="w-full h-full border-0 block"
            sandbox="allow-scripts allow-same-origin"
            title={title}
          />
        )}
      </div>

      <div className="h-7 min-h-[28px] border-t border-border/40 bg-surface-muted/60 px-3 flex items-center gap-3 text-[11px] font-mono text-ink-muted shrink-0">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" /> ScienceMaterial {isFree && "· Free Tier"}</span>
        <span className="hidden sm:inline">Interactive Lab {isFree ? "· Free" : "· Requires Approval"}</span>
        <span className="ml-auto">© 2026 ScienceMaterial</span>
      </div>
    </div>
  )
}
