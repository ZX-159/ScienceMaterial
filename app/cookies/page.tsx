"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CookiesPage() {
  const [prefs, setPrefs] = useState({ essential: true, analytics: false, personalisation: false })
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[720px] px-6 lg:px-8 py-12 pb-24">
        <h1 className="text-[28px] font-semibold tracking-[-0.02em]">Cookie Preferences</h1>
        <p className="mt-3 text-[14px] text-ink-muted leading-relaxed">We use essential storage to keep ScienceMaterial working and optional analytics to improve the platform.</p>

        <div className="mt-8 space-y-4">
          <Card><CardHeader><CardTitle className="flex items-center justify-between">Essential — Always active <span className="text-[11px] font-mono text-mineral border border-mineral/20 bg-mineral/10 px-2 py-0.5 rounded-full">Required</span></CardTitle></CardHeader><CardContent><p className="text-[13px] text-ink-muted">Auth (Neon Auth), local progress (Dexie/IndexedDB), theme. Cannot be disabled.</p></CardContent></Card>
          <Card><CardHeader><CardTitle className="flex items-center justify-between">Analytics — Optional <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" checked={prefs.analytics} onChange={e=>setPrefs(p=>({...p,analytics:e.target.checked}))} className="sr-only peer" /><div className="w-11 h-6 bg-surface-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div></label></CardTitle></CardHeader><CardContent><p className="text-[13px] text-ink-muted">Aggregated: chapters opened, completed, quiz attempts, experiment launches. No ad tracking. Only after consent.</p></CardContent></Card>
          <Card><CardHeader><CardTitle className="flex items-center justify-between">Personalisation — Optional <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" checked={prefs.personalisation} onChange={e=>setPrefs(p=>({...p,personalisation:e.target.checked}))} className="sr-only peer" /><div className="w-11 h-6 bg-surface-muted rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div></label></CardTitle></CardHeader><CardContent><p className="text-[13px] text-ink-muted">Theme preference, recent chapters, bookmarks order. Stored locally.</p></CardContent></Card>
        </div>

        <div className="mt-8 flex gap-2">
          <Button onClick={()=>setPrefs({essential:true,analytics:true,personalisation:true})}>Accept All</Button>
          <Button variant="outline" onClick={()=>setPrefs({essential:true,analytics:false,personalisation:false})}>Essential Only</Button>
          <Button variant="secondary">Save Preferences</Button>
        </div>

        <div className="mt-6 text-[11px] font-mono text-ink-muted">We respect your privacy and only load optional analytics after consent.</div>
        <footer className="mt-8 pt-6 border-t border-border/50 text-[11px] font-mono text-ink-muted">© 2026 ScienceMaterial</footer>
      </div>
    </div>
  )
}
