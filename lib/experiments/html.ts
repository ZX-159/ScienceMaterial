import fs from 'fs'
import path from 'path'

export function getExperimentHTML(id: string): string {
  // ScienceMaterial experiments — vanilla JS, original implementation
  // Files in public/experiments/{slug}.html, sandbox allow-scripts only
  
  if (typeof window === 'undefined') {
    try {
      const fs = require('fs')
      const path = require('path')
      const expPath = path.join(process.cwd(), 'public/experiments', `${id}.html`)
      if (fs.existsSync(expPath)) {
        return fs.readFileSync(expPath, 'utf-8')
      }
    } catch {}
  }

  // Placeholder if file not found
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>
    *{margin:0;padding:0;box-sizing:border-box}
    :root{--bg:#FFFEFB;--bg2:#F2F1E9;--surface:#FFFEFB;--muted:#ECE9E0;--border:#DDD9CF;--ink:#1C2C42;--ink2:#68786F;--teal:#146E61;--tealSoft:#E4EEE4;--app-height:100vh}
    html,body{min-height:var(--app-height,100vh)}
    body{font-family:-apple-system,BlinkMacSystemFont,Inter,system-ui,sans-serif;background:var(--bg2);color:var(--ink);display:flex;flex-direction:column;letter-spacing:-0.011em;padding:24px;min-height:var(--app-height,100vh)}
    .card{max-width:640px;margin:40px auto;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
    .badge{font-size:10px;font-family:ui-monospace;padding:3px 8px;border-radius:999px;background:var(--ink);color:var(--surface)}
    h1{font-size:20px;font-weight:600;letter-spacing:-0.02em;margin-bottom:12px}
    p{font-size:14px;line-height:1.6;color:var(--ink2);margin-bottom:12px}
    code{font-family:ui-monospace;background:var(--muted);padding:2px 6px;border-radius:6px;font-size:12px}
  </style></head><body>
    <div class="card">
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:16px"><span class="badge">Not found</span><span style="font-size:11px;font-family:ui-monospace;color:#9AA09D">${id}</span></div>
      <h1>Experiment not found — ${id}</h1>
      <p>ScienceMaterial has 82 experiments in <code>public/experiments/</code> — vanilla JS, original implementation.</p>
      <p>Available: check /laboratory for full list.</p>
    </div>
  </body></html>`
}
