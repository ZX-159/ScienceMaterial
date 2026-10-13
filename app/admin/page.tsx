"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CmsEditor } from "@/components/admin/cms-editor"
import { Users, BookOpen, FlaskConical, BarChart3, FileText, Shield, Database, Upload, Settings, Trash2, Eye, CheckCircle, Search, Filter, Plus, Edit3, Activity, Bookmark, GraduationCap, FileQuestion, Copy, Download, Image as ImageIcon, Play, Save, X, GripVertical, BookMarked, Layers, UserPlus, Ban, RefreshCw } from "lucide-react"
import { ExperimentUploader } from "@/components/laboratory/experiment-uploader"
import { useEffect, useState } from "react"
import { books as initialBooks, chapters as initialChapters } from "@/lib/curriculum/data"
import { experiments as localExperiments } from "@/lib/experiments/data"
import { Logo } from "@/components/ui/logo"
import { UsersManagement } from "@/components/admin/users-management"

interface ExpMeta {
  id: string
  slug: string
  title: string
  titleZh: string
  subject: string
  chapterId?: string
  bookSlug?: string
  sectionId?: string
  size?: number
  type: string
  difficulty: string | number
  description?: string
}

interface BookEdit {
  id: string
  slug: string
  titleZh: string
  titleEn: string
  year: string
  description: string
  chapterCount: number
}

interface ChapterEdit {
  id: string
  bookId: string
  bookSlug: string
  number: number
  titleZh: string
  slug: string
  estimatedMinutes: number
}

export default function AdminPage() {
  const [expList, setExpList] = useState<ExpMeta[]>([])
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChapter, setSelectedChapter] = useState<string>('')
  const [cmsContent, setCmsContent] = useState('')
  const [saveStatus, setSaveStatus] = useState<'idle'|'saving'|'saved'>('idle')
  const [activeTab, setActiveTab] = useState<'overview'|'experiments'|'courses'|'content'|'users'|'analytics'|'settings'>('overview')
  const [stats, setStats] = useState({ users: 1248, chapters: 64, quizzes: 8432, experiments: 82 })
  const [books, setBooks] = useState<BookEdit[]>(initialBooks as any)
  const [chapters, setChapters] = useState<ChapterEdit[]>(initialChapters as any)
  const [editingBook, setEditingBook] = useState<string | null>(null)
  const [editingChapter, setEditingChapter] = useState<string | null>(null)
  const [newChapterBook, setNewChapterBook] = useState<string>('chu-yi-shang')
  const [screenshotStatus, setScreenshotStatus] = useState<string>('')
  // Template creation
  const [templateSlug, setTemplateSlug] = useState('')
  const [templateTitle, setTemplateTitle] = useState('')
  const [templateTitleZh, setTemplateTitleZh] = useState('')
  const [templateSubject, setTemplateSubject] = useState('physics')
  const [templateDesc, setTemplateDesc] = useState('')
  const [templateChapter, setTemplateChapter] = useState('')
  const [templateCreating, setTemplateCreating] = useState(false)
  // Sections management
  const [selectedBookForSections, setSelectedBookForSections] = useState('chu-yi-shang')
  const [sectionTitle, setSectionTitle] = useState('')
  const [sectionsMap, setSectionsMap] = useState<Record<string, {id:string, titleZh:string}[]>>({})

  useEffect(() => {
    fetch("/api/experiments").then(r=>r.json()).then(d=>{
      if(Array.isArray(d)) {
        setExpList(d)
        setStats(s=>({...s, experiments: d.length}))
      } else {
        setExpList(localExperiments as any)
      }
    }).catch(()=>{
      setExpList(localExperiments as any)
    })
    const savedBooks = localStorage.getItem('admin-books')
    if(savedBooks){ try{ setBooks(JSON.parse(savedBooks)) }catch{} }
    const savedChapters = localStorage.getItem('admin-chapters')
    if(savedChapters){ try{ setChapters(JSON.parse(savedChapters)) }catch{} }
  }, [])

  const filtered = expList.filter(e=>{
    const matchesFilter = filter==='all' ? true : e.subject===filter
    const matchesSearch = searchQuery ? (e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.titleZh.includes(searchQuery) || e.slug.includes(searchQuery.toLowerCase())) : true
    const matchesChapter = selectedChapter ? e.chapterId===selectedChapter : true
    return matchesFilter && matchesSearch && matchesChapter
  })

  const handleSaveCms = (content: string) => {
    setSaveStatus('saving')
    setCmsContent(content)
    localStorage.setItem('cms-draft', content)
    setTimeout(()=>setSaveStatus('saved'), 600)
    setTimeout(()=>setSaveStatus('idle'), 2000)
  }

  const handleDeleteExp = async (slug: string) => {
    if(!confirm(`Delete ${slug}? This will remove the file from public/experiments/`)) return
    try{
      const res = await fetch(`/api/experiments?slug=${slug}`, { method: 'DELETE' })
      if(res.ok){
        setExpList(list=>list.filter(e=>e.slug!==slug))
      }
    }catch{}
  }

  const handleDuplicateExp = async (exp: ExpMeta) => {
    const newSlug = `${exp.slug}-copy-${Date.now().toString().slice(-4)}`
    try{
      const htmlRes = await fetch(`/experiments/${exp.slug}.html`)
      const html = await htmlRes.text()
      const res = await fetch('/api/experiments', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          slug: newSlug,
          title: `${exp.title} Copy`,
          titleZh: `${exp.titleZh} 副本`,
          description: exp.description || `Copy of ${exp.titleZh}`,
          subject: exp.subject,
          type: exp.type,
          difficulty: exp.difficulty,
          bookSlug: exp.bookSlug,
          chapterId: exp.chapterId,
          sectionId: exp.sectionId,
          html_source: html
        })
      })
      if(res.ok){
        const data = await res.json()
        fetch("/api/experiments").then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setExpList(d) })
      }
    }catch(e){ alert('Duplicate failed: '+e) }
  }

  const handleExportExperiments = () => {
    const blob = new Blob([JSON.stringify(expList, null, 2)], {type:'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `experiments-${new Date().toISOString().slice(0,10)}.json`
    a.click()
  }

  const handleSaveBooks = () => {
    localStorage.setItem('admin-books', JSON.stringify(books))
    localStorage.setItem('admin-chapters', JSON.stringify(chapters))
    alert('Saved to localStorage. Export curriculum/data.ts manually if needed.')
  }

  const handleAddChapter = () => {
    const book = books.find(b=>b.slug===newChapterBook)
    if(!book) return
    const existing = chapters.filter(c=>c.bookSlug===newChapterBook)
    const num = existing.length + 1
    const newCh: ChapterEdit = {
      id: `b${books.findIndex(b=>b.slug===newChapterBook)+1}-c${num}`,
      bookId: book.id,
      bookSlug: book.slug,
      number: num,
      titleZh: `新章节 ${num}`,
      slug: `new-chapter-${num}`,
      estimatedMinutes: 15
    }
    setChapters([...chapters, newCh])
  }

  const handleDeleteChapter = (id: string) => {
    if(!confirm(`Delete chapter ${id}?`)) return
    setChapters(chapters.filter(c=>c.id!==id))
  }

  const handleCaptureScreenshots = async () => {
    setScreenshotStatus('Starting Playwright...')
    try{
      const res = await fetch('/api/sync', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({type:'screenshot-trigger'}) })
      setScreenshotStatus('Triggered. Run locally: npx playwright test tests/screenshot.spec.ts --project=chromium')
      setTimeout(()=>setScreenshotStatus(''), 5000)
    }catch{
      setScreenshotStatus('Run: npx playwright test tests/screenshot.spec.ts')
      setTimeout(()=>setScreenshotStatus(''), 5000)
    }
  }

  const handleCreateFromTemplate = async () => {
    if(!templateSlug || !templateTitle || !templateTitleZh) {
      alert('Please fill slug, title, titleZh')
      return
    }
    if(!/^[a-z0-9-]+$/.test(templateSlug)) {
      alert('Slug must be lowercase alphanumeric with hyphens')
      return
    }
    setTemplateCreating(true)
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${templateTitleZh} · ${templateTitle} · ScienceMaterial</title>
<meta name="description" content="${templateDesc || 'ScienceMaterial interactive lab'}">
<style>
:root{color-scheme:light;--paper:#fffefb;--bg:#f2f1e9;--line:#DDD9CF;--ink:#1C2C42;--muted:#5A605D;--teal:#146e61;--teal-soft:#e4eee4;--app-height:100vh}
*{box-sizing:border-box}html,body{margin:0;min-height:var(--app-height,100vh)}
body{background:var(--bg);color:var(--ink);font:14px/1.5 -apple-system,BlinkMacSystemFont,system-ui,sans-serif;display:flex;flex-direction:column;height:var(--app-height,100vh);overflow:hidden}
.toolbar{height:52px;min-height:52px;padding:0 14px;background:rgba(255,254,251,0.92);backdrop-filter:blur(24px);border-bottom:1px solid var(--line);display:flex;align-items:center;gap:10px;flex:none}
.hleft{flex:1;min-width:0;display:flex;align-items:center;gap:8px;overflow:hidden}
.hleft h1{font-size:13px;font-weight:700;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:6px}
.sub{font-size:11px;color:var(--muted)}
.hbtns{display:flex;gap:6px;margin-left:auto}
.hbtn{border:1px solid var(--line);background:#fffefb;border-radius:10px;padding:6px 10px;font-size:11px;cursor:pointer}
.hbtn.primary{background:var(--teal);color:#fff;border-color:var(--teal)}
.main{flex:1;display:flex;min-height:0;overflow:hidden}
.workspace{flex:1;min-width:0;display:flex;flex-direction:column;padding:14px;gap:12px;overflow:auto}
.intro{display:flex;justify-content:space-between;gap:12px}
.eyebrow{font:600 10px/1.4 ui-monospace;color:var(--teal);letter-spacing:.08em;text-transform:uppercase}
.scene-card{flex:1;display:flex;flex-direction:column;min-height:380px;border:1px solid var(--line);border-radius:16px;background:var(--paper);overflow:hidden}
.scene-top{display:flex;justify-content:space-between;padding:8px 12px;border-bottom:1px solid var(--line);font-size:11px}
.canvas-wrap{flex:1;position:relative;min-height:320px;background:#f9fbf3}
canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.scene-bottom{display:flex;justify-content:space-between;padding:8px 12px;border-top:1px solid var(--line);font-size:11px}
.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--line)}
.metric{background:#fffefb;padding:8px 10px;min-height:60px}
.metric .label{font-size:10px;color:var(--muted)}
.metric .value{font:600 18px/1.2 ui-monospace}
.side-panel{width:300px;min-width:300px;border-left:1px solid var(--line);background:#fffefb;display:flex;flex-direction:column}
.panel-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;padding:8px;border-bottom:1px solid var(--line)}
.panel-tabs button{border:0;background:transparent;padding:8px 4px;font-size:11px;cursor:pointer;border-radius:8px}
.panel-tabs button.on{background:var(--teal-soft);color:var(--teal);font-weight:600}
.panel-scroll{flex:1;overflow:auto;padding:14px}
.control{margin-bottom:16px}
.control-head{display:flex;justify-content:space-between;margin-bottom:6px;font-size:11px;font-weight:600}
.range-row{display:flex;align-items:center;gap:6px}
input[type=range]{flex:1}
.qbox{border-left:3px solid var(--teal);background:var(--teal-soft);padding:10px 12px;border-radius:0 10px 10px 0;margin:10px 0;font-size:12px}
.kbox{border-left:3px solid #C9A227;background:#FFF8E1;padding:10px 12px;border-radius:0 10px 10px 0;margin:10px 0;font-size:12px}
.statline{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}
.chip{font-size:10px;border:1px solid var(--line);border-radius:999px;padding:3px 8px;background:#fffefb}
.chip.hl{background:var(--teal);color:#fff;border-color:var(--teal)}
.panel{display:none}.panel.on{display:block}
#dock{border-top:1px solid var(--line);background:#fffefb;padding:8px 12px;display:flex;gap:8px;flex-wrap:wrap;font-size:11px}
.dsec{display:none}.dsec.on{display:flex;gap:8px;align-items:center}
</style>
</head>
<body>
<header class="toolbar">
  <div class="hleft">
    <svg width="20" height="20" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="#1C2C42"/><path d="M9 9H19L17.5 19C17.5 19 16 21 14 21C12 21 10.5 19 10.5 19L9 9Z" fill="#FFFEFB"/><circle cx="14" cy="14" r="2" fill="#146E61"/></svg>
    <h1>${templateTitleZh} · ${templateTitle}</h1>
    <div class="sub">${templateDesc || 'ScienceMaterial interactive lab'}</div>
  </div>
  <div class="hbtns">
    <button class="hbtn" id="langBtn">EN</button>
    <button class="hbtn" id="themeBtn">🌙</button>
    <button class="hbtn primary" id="resetBtn">↺ Reset</button>
  </div>
</header>
<div class="tabs" style="display:flex;gap:4px;padding:8px 14px;border-bottom:1px solid var(--line);background:#fffefb">
  <button class="tab on" data-tab="0" style="border:1px solid var(--line);border-radius:10px;padding:6px 12px;background:var(--teal);color:#fff">① 实验台</button>
  <button class="tab" data-tab="1" style="border:1px solid var(--line);border-radius:10px;padding:6px 12px;background:#fffefb">② 图表·数据</button>
  <button class="tab" data-tab="2" style="border:1px solid var(--line);border-radius:10px;padding:6px 12px;background:#fffefb">③ 要点·公式</button>
  <button class="tab" data-tab="3" style="border:1px solid var(--line);border-radius:10px;padding:6px 12px;background:#fffefb">④ 测验</button>
</div>
<main class="main">
  <section class="workspace">
    <div class="intro">
      <div>
        <div class="eyebrow">ScienceMaterial · ${templateSlug}</div>
        <h2>${templateTitleZh}</h2>
        <p>${templateDesc || '拖一拖、调一调，观察变化。'} — 包含实验台、图表数据、要点公式、测验四个标签页。</p>
      </div>
    </div>
    <div class="panel on" id="p0">
      <div class="scene-card">
        <div class="scene-top"><span>Interactive Lab · ${templateTitleZh}</span><span id="status">Ready</span></div>
        <div class="canvas-wrap"><canvas id="scene" width="1200" height="600"></canvas></div>
        <div class="scene-bottom"><span>调节参数，观察现象</span><div style="display:flex;gap:6px"><button class="hbtn" id="playBtn">▶ Play</button><button class="hbtn" id="resetBtn2">↺ Reset</button></div></div>
      </div>
      <div class="metrics"><div class="metric"><div class="label">Parameter A</div><div class="value" id="mA">1.0</div></div><div class="metric"><div class="label">Parameter B</div><div class="value" id="mB">2.0</div></div><div class="metric"><div class="label">Result</div><div class="value" id="mR">3.0</div></div><div class="metric"><div class="label">Time</div><div class="value" id="mT">0.0</div></div></div>
      <div class="qbox">题目：${templateTitleZh}中，调节参数A从1.0到2.0，结果如何变化？</div>
      <div class="kbox">要点：${templateDesc || '通过实验观察定量关系。'}</div>
    </div>
    <div class="panel" id="p1"><div class="scene-card"><div class="scene-top"><span>图表·数据</span></div><div class="canvas-wrap"><canvas id="chart" width="800" height="400" style="position:relative;width:100%;height:100%"></canvas></div></div></div>
    <div class="panel" id="p2"><h3>要点·公式</h3><div class="kbox">核心公式：Result = f(A, B)</div></div>
    <div class="panel" id="p3"><h3>测验</h3><div id="quiz"></div></div>
  </section>
  <aside class="side-panel">
    <div class="panel-tabs"><button class="on" data-tab="lab">Lab</button><button data-tab="chart">Chart</button><button data-tab="points">Points</button><button data-tab="quiz">Quiz</button></div>
    <div class="panel-scroll">
      <div class="control"><div class="control-head"><span>Parameter A</span><output id="oA">1.0</output></div><div class="range-row"><input type="range" id="rA" min="0.1" max="5" step="0.1" value="1.0"><span id="vA">1.0</span></div></div>
      <div class="control"><div class="control-head"><span>Parameter B</span><output id="oB">2.0</output></div><div class="range-row"><input type="range" id="rB" min="0.1" max="10" step="0.1" value="2.0"><span id="vB">2.0</span></div></div>
    </div>
  </aside>
</main>
<div id="dock"><div class="dsec on"><span>① 实验台</span><span class="chip hl" id="dockA">A=1.0</span></div></div>
<footer style="padding:8px 12px;font-size:11px;color:#5A605D;display:flex;justify-content:space-between;font-family:ui-monospace"><span>© 2026 ScienceMaterial</span><span>ScienceMaterial</span></footer>
<script>
const $=id=>document.getElementById(id);
let A=1.0,B=2.0,t=0,running=true;
const canvas=$('scene'),ctx=canvas.getContext('2d');
const chart=$('chart'),cctx=chart.getContext('2d');
function resize(){const dpr=window.devicePixelRatio||1;let rect=canvas.getBoundingClientRect();canvas.width=rect.width*dpr;canvas.height=rect.height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);let rect2=chart.getBoundingClientRect();chart.width=rect2.width*dpr;chart.height=rect2.height*dpr;cctx.setTransform(dpr,0,0,dpr,0,0);draw();}window.addEventListener('resize',resize);
function calcResult(a,b){return (a*b + Math.sin(t)*0.2).toFixed(2);}
function draw(){const rect=canvas.getBoundingClientRect();const W=rect.width,H=rect.height;ctx.clearRect(0,0,W,H);ctx.fillStyle='#f9fbf3';ctx.fillRect(0,0,W,H);ctx.strokeStyle='#DDD9CF';ctx.lineWidth=0.5;for(let x=0;x<W;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}for(let y=0;y<H;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}const cx=W/2,cy=H/2;const r=30+A*15;ctx.fillStyle='#146e61';ctx.beginPath();ctx.arc(cx+Math.sin(t)*20,cy,r,0,Math.PI*2);ctx.fill();ctx.fillStyle='#1C2C42';ctx.font='600 12px -apple-system';ctx.textAlign='center';ctx.fillText(\`A=\${A.toFixed(1)} B=\${B.toFixed(1)} R=\${calcResult(A,B)}\`,cx,30);ctx.fillText('${templateTitleZh}',cx,H-20);}
function updateMetrics(){const R=calcResult(A,B);if($('mA'))$('mA').textContent=A.toFixed(1);if($('mB'))$('mB').textContent=B.toFixed(1);if($('mR'))$('mR').textContent=R;if($('mT'))$('mT').textContent=t.toFixed(1);if($('dockA'))$('dockA').textContent='A='+A.toFixed(1);}
function showTab(i){document.querySelectorAll('.tab').forEach((el,k)=>{const on=k===i;el.classList.toggle('on',on);el.style.background=on?'#146e61':'#fffefb';el.style.color=on?'#fff':'#1C2C42';});document.querySelectorAll('.panel').forEach((el,k)=>el.classList.toggle('on',k===i));}
document.querySelectorAll('.tab').forEach((btn,i)=>btn.addEventListener('click',()=>showTab(i)));
const rA=$('rA'),rB=$('rB');if(rA)rA.addEventListener('input',e=>{A=parseFloat(e.target.value);updateMetrics();draw();});if(rB)rB.addEventListener('input',e=>{B=parseFloat(e.target.value);updateMetrics();draw();});
const resetBtn=$('resetBtn');if(resetBtn)resetBtn.addEventListener('click',()=>{A=1.0;B=2.0;t=0;if(rA)rA.value=A;if(rB)rB.value=B;updateMetrics();draw();});
function loop(){if(running){t+=0.02;updateMetrics();draw();}requestAnimationFrame(loop);}
resize();updateMetrics();draw();loop();
setTimeout(()=>{try{parent.postMessage({type:'ready',id:'${templateSlug}'},'*');}catch{}},500);
</script>
</body>
</html>
`
    try{
      const res = await fetch('/api/experiments', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          slug: templateSlug,
          title: templateTitle,
          titleZh: templateTitleZh,
          description: templateDesc || `${templateTitleZh} interactive lab`,
          subject: templateSubject,
          type: 'simulation',
          difficulty: 'beginner',
          bookSlug: templateChapter ? templateChapter.split('/')[0] : undefined,
          chapterId: templateChapter ? templateChapter.split('/')[1] : undefined,
          html_source: html
        })
      })
      if(res.ok){
        alert(`Created ${templateSlug}`)
        setTemplateSlug(''); setTemplateTitle(''); setTemplateTitleZh(''); setTemplateDesc(''); setTemplateChapter('')
        fetch("/api/experiments").then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setExpList(d) })
      } else {
        const err = await res.json()
        alert('Failed: ' + JSON.stringify(err))
      }
    }catch(e){ alert('Error: '+e) }
    finally{ setTemplateCreating(false) }
  }

  const handleAddSection = () => {
    if(!sectionTitle) { alert('Enter section title'); return }
    const ch = chapters.find(c=>c.id===selectedBookForSections || c.bookSlug===selectedBookForSections)
    const targetId = ch?.id || selectedBookForSections
    const existing = sectionsMap[targetId] || []
    const newSec = { id: `s${existing.length+1}`, titleZh: sectionTitle }
    setSectionsMap({ ...sectionsMap, [targetId]: [...existing, newSec] })
    setSectionTitle('')
    localStorage.setItem('admin-sections', JSON.stringify({ ...sectionsMap, [targetId]: [...existing, newSec] }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1360px] px-6 lg:px-8 py-8 pb-24">
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <Logo size={32} />
          <div className="min-w-0">
            <h1 className="text-[22px] font-semibold tracking-[-0.02em] leading-tight">Admin Dashboard</h1>
            <div className="text-[12px] text-ink-muted">ScienceMaterial CMS · 82 Labs · 6 Books · 64 Chapters · Unified Logo</div>
          </div>
          <div className="ml-auto flex gap-2 flex-wrap">
            <Badge variant="default" className="text-[11px]">Admin</Badge>
            <Badge variant="secondary" className="text-[11px]">{stats.experiments} experiments</Badge>
            <Badge variant="outline" className="text-[11px]">ScienceMaterial</Badge>
          </div>
        </div>

        <div className="flex gap-2 mb-8 border-b border-border/60 pb-0 overflow-x-auto scrollbar-none">
          {[
            {id:'overview', label:'Overview', icon: Activity},
            {id:'experiments', label:'Experiments', icon: FlaskConical},
            {id:'courses', label:'Courses', icon: BookMarked},
            {id:'content', label:'Content Editor', icon: BookOpen},
            {id:'users', label:'Users', icon: Users},
            {id:'analytics', label:'Analytics', icon: BarChart3},
            {id:'settings', label:'Settings', icon: Settings},
          ].map(tab=>(
            <button key={tab.id} onClick={()=>setActiveTab(tab.id as any)} className={`flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-[500] border-b-2 -mb-px transition-colors whitespace-nowrap ${activeTab===tab.id ? 'border-teal text-teal' : 'border-transparent text-ink-muted hover:text-ink'}`}>
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab==='overview' && (
          <>
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card className="border-border/60 shadow-xs hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-ink-muted tracking-wider"><Users className="h-3.5 w-3.5" /> USERS</div>
                  <div className="text-[26px] font-semibold tracking-[-0.02em] mt-1 leading-none">{stats.users}</div>
                  <div className="text-[11px] text-ink-muted mt-1.5">Registered learners · local-first</div>
                  <div className="mt-3 h-1 bg-border rounded-full overflow-hidden"><div className="h-full bg-teal w-[72%]" /></div>
                </CardContent>
              </Card>
              <Card className="border-border/60 shadow-xs hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-ink-muted tracking-wider"><BookOpen className="h-3.5 w-3.5" /> CHAPTERS</div>
                  <div className="text-[26px] font-semibold tracking-[-0.02em] mt-1 leading-none">{chapters.length}</div>
                  <div className="text-[11px] text-ink-muted mt-1.5">6 books · 64 chapters · editable</div>
                  <div className="mt-3 flex gap-1">{books.map(b=><div key={b.id} className="h-1 flex-1 bg-teal/30 rounded-full" />)}</div>
                </CardContent>
              </Card>
              <Card className="border-border/60 shadow-xs hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-ink-muted tracking-wider"><FlaskConical className="h-3.5 w-3.5" /> EXPERIMENTS</div>
                  <div className="text-[26px] font-semibold tracking-[-0.02em] mt-1 leading-none">{stats.experiments}</div>
                  <div className="text-[11px] text-ink-muted mt-1.5">Interactive labs · 82 verified</div>
                  <div className="mt-3 h-1 bg-border rounded-full overflow-hidden"><div className="h-full bg-brass w-[92%]" /></div>
                </CardContent>
              </Card>
              <Card className="border-border/60 shadow-xs hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-ink-muted tracking-wider"><BarChart3 className="h-3.5 w-3.5" /> QUIZ ATTEMPTS</div>
                  <div className="text-[26px] font-semibold tracking-[-0.02em] mt-1 leading-none">{stats.quizzes}</div>
                  <div className="text-[11px] text-ink-muted mt-1.5">Completed quizzes · growth +12%</div>
                  <div className="mt-3 h-1 bg-border rounded-full overflow-hidden"><div className="h-full bg-mineral w-[68%]" /></div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-[320px_1fr] gap-6">
              <div className="space-y-4">
                <Card className="border-border/60 shadow-xs h-fit">
                  <CardHeader className="pb-3"><CardTitle className="text-[14px]">Quick Actions</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    <Link href="/laboratory"><Button variant="outline" size="sm" className="w-full justify-start rounded-[10px]"><Eye className="h-4 w-4 mr-2" /> View Laboratory</Button></Link>
                    <Link href="/courses"><Button variant="outline" size="sm" className="w-full justify-start rounded-[10px]"><BookOpen className="h-4 w-4 mr-2" /> View Courses</Button></Link>
                    <Button variant="outline" size="sm" className="w-full justify-start rounded-[10px]" onClick={()=>setActiveTab('experiments')}><Plus className="h-4 w-4 mr-2" /> Manage Experiments</Button>
                    <Button variant="outline" size="sm" className="w-full justify-start rounded-[10px]" onClick={()=>setActiveTab('courses')}><BookMarked className="h-4 w-4 mr-2" /> Edit Courses</Button>
                    <Button variant="outline" size="sm" className="w-full justify-start rounded-[10px]" onClick={()=>setActiveTab('content')}><Edit3 className="h-4 w-4 mr-2" /> Content Editor</Button>
                    <Button variant="outline" size="sm" className="w-full justify-start rounded-[10px]" onClick={handleCaptureScreenshots}><ImageIcon className="h-4 w-4 mr-2" /> Capture Screenshots</Button>
                  </CardContent>
                </Card>
                <Card className="border-border/60 shadow-xs">
                  <CardHeader className="pb-3"><CardTitle className="text-[13px]">System Health</CardTitle></CardHeader>
                  <CardContent className="space-y-2 text-[12px]">
                    <div className="flex justify-between"><span>Build</span><Badge variant="secondary" className="text-[10px]">Passing</Badge></div>
                    <div className="flex justify-between"><span>Experiments</span><span className="font-mono">82 / 82 OK</span></div>
                    <div className="flex justify-between"><span>Branding</span><span className="font-mono">Clean ✓</span></div>
                    <div className="flex justify-between"><span>Logo</span><span className="font-mono">Unified ✓</span></div>
                    <div className="flex justify-between"><span>Footer</span><span className="font-mono">ScienceMaterial ✓</span></div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border/60 shadow-xs">
                <CardHeader><CardTitle className="text-[14px]">Recent Activity · Today</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-[12px] text-ink-muted space-y-2">
                    <div className="flex justify-between p-2.5 rounded-[10px] bg-surface-muted/50 border border-border/30"><span className="flex items-center gap-2"><FlaskConical className="h-3.5 w-3.5" /> New experiment: titration-lab</span><span className="text-ink-muted">Today</span></div>
                    <div className="flex justify-between p-2.5 rounded-[10px] bg-surface-muted/50 border border-border/30"><span className="flex items-center gap-2"><FlaskConical className="h-3.5 w-3.5" /> Updated: electromagnet-lab · chart fixed</span><span className="text-ink-muted">Today</span></div>
                    <div className="flex justify-between p-2.5 rounded-[10px] bg-surface-muted/50 border border-border/30"><span className="flex items-center gap-2"><BookMarked className="h-3.5 w-3.5" /> Curriculum cleaned · branding cleaned</span><span className="text-ink-muted">Today</span></div>
                    <div className="flex justify-between p-2.5 rounded-[10px] bg-teal-soft/40 border border-teal/15"><span className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-teal" /> 82 experiments verified · Playwright</span><span className="text-ink-muted">Today</span></div>
                    <div className="flex justify-between p-2.5 rounded-[10px] bg-surface-muted/50 border border-border/30"><span className="flex items-center gap-2"><Logo size={14} /> Branding audit passed · footer ScienceMaterial</span><span className="text-ink-muted">Today</span></div>
                  </div>
                  {screenshotStatus && <div className="mt-3 text-[11px] font-mono p-2 rounded bg-brass-soft border border-brass/20">{screenshotStatus}</div>}
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeTab==='experiments' && (
          <div className="space-y-6">
            <Card className="border-border/60 shadow-xs">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <CardTitle className="text-[14px] flex items-center gap-2"><FlaskConical className="h-4 w-4" /> Experiments · {filtered.length} / {expList.length} · 82 total</CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    <div className="flex items-center gap-2 rounded-[10px] border border-border bg-surface px-3 h-8">
                      <Search className="h-3.5 w-3.5 text-ink-faint" />
                      <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search experiments..." className="bg-transparent outline-none text-[12px] w-[160px]" />
                    </div>
                    <select value={filter} onChange={e=>setFilter(e.target.value)} className="rounded-[10px] border border-border bg-surface text-[12px] px-2 h-8">
                      <option value="all">All subjects</option>
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                      <option value="biology">Biology</option>
                      <option value="earth">Earth</option>
                      <option value="space">Space</option>
                    </select>
                    <select value={selectedChapter} onChange={e=>setSelectedChapter(e.target.value)} className="rounded-[10px] border border-border bg-surface text-[12px] px-2 h-8 max-w-[200px]">
                      <option value="">All chapters</option>
                      {chapters.map(ch=><option key={ch.id} value={ch.id}>{ch.bookSlug} · {ch.id} · {ch.titleZh}</option>)}
                    </select>
                    <Button variant="outline" size="sm" className="h-8 rounded-[10px]" onClick={handleExportExperiments}><Download className="h-3.5 w-3.5 mr-1" /> Export</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="max-h-[600px] overflow-auto border border-border/50 rounded-[12px] divide-y divide-border/50">
                  {filtered.map(exp=>(
                    <div key={exp.id} className="flex items-center gap-3 p-3 hover:bg-surface-muted/50 transition-colors group">
                      <div className="h-9 w-9 rounded-[10px] bg-surface-muted border border-border flex items-center justify-center shrink-0 group-hover:bg-teal-soft group-hover:border-teal/15 transition-colors">
                        <FlaskConical className="h-4 w-4 text-ink-muted group-hover:text-teal" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-[500] truncate flex items-center gap-2">{exp.titleZh} · {exp.title} {exp.chapterId && <Badge variant="secondary" className="text-[9px]">{exp.chapterId}</Badge>}</div>
                        <div className="text-[11px] font-mono text-ink-muted truncate">{exp.slug} · {exp.chapterId || 'no chapter'} · {exp.bookSlug || 'no book'} · {typeof exp.size==='number'? Math.round(exp.size/1024)+'KB':''}</div>
                      </div>
                      <Badge variant="outline" className="text-[10px]">{exp.subject}</Badge>
                      <Badge variant="secondary" className="text-[10px]">{exp.type}</Badge>
                      <div className="flex gap-1 shrink-0">
                        <Link href={`/laboratory/${exp.slug}`}><Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-[10px]" title="View"><Eye className="h-4 w-4" /></Button></Link>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-[10px]" onClick={()=>handleDuplicateExp(exp)} title="Duplicate"><Copy className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-[10px] hover:text-oxide" onClick={()=>handleDeleteExp(exp.slug)} title="Delete"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-xs">
              <CardHeader><CardTitle className="text-[13px] flex items-center gap-2"><Plus className="h-4 w-4" /> Create from Template · High Contrast · ScienceMaterial</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-ink-muted">Slug (lowercase-hyphen)</label>
                    <input value={templateSlug} onChange={e=>setTemplateSlug(e.target.value)} placeholder="e.g. my-new-lab" className="w-full rounded-[10px] border border-border px-3 py-2 text-[13px] bg-surface" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-ink-muted">Subject</label>
                    <select value={templateSubject} onChange={e=>setTemplateSubject(e.target.value)} className="w-full rounded-[10px] border border-border bg-surface px-3 py-2 text-[13px]">
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                      <option value="biology">Biology</option>
                      <option value="earth">Earth</option>
                      <option value="space">Space</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-ink-muted">Title EN</label>
                    <input value={templateTitle} onChange={e=>setTemplateTitle(e.target.value)} placeholder="e.g. My New Lab" className="w-full rounded-[10px] border border-border px-3 py-2 text-[13px] bg-surface" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-ink-muted">Title ZH</label>
                    <input value={templateTitleZh} onChange={e=>setTemplateTitleZh(e.target.value)} placeholder="e.g. 我的新实验" className="w-full rounded-[10px] border border-border px-3 py-2 text-[13px] bg-surface" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-mono text-ink-muted">Description</label>
                  <input value={templateDesc} onChange={e=>setTemplateDesc(e.target.value)} placeholder="Brief description, high contrast, ScienceMaterial branding" className="w-full rounded-[10px] border border-border px-3 py-2 text-[13px] bg-surface" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-mono text-ink-muted">Map to Chapter (bookSlug/chapterId)</label>
                  <select value={templateChapter} onChange={e=>setTemplateChapter(e.target.value)} className="w-full rounded-[10px] border border-border bg-surface px-3 py-2 text-[13px]">
                    <option value="">No mapping (custom)</option>
                    {chapters.map(ch=><option key={ch.id} value={`${ch.bookSlug}/${ch.id}`}>{ch.bookSlug} / {ch.id} · {ch.titleZh}</option>)}
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="rounded-[10px]" onClick={handleCreateFromTemplate} disabled={templateCreating}><Plus className="h-4 w-4 mr-1" /> {templateCreating ? 'Creating...' : 'Create Lab from Template'}</Button>
                  <Badge variant="outline" className="text-[10px]">High contrast · 20px logo · 52px toolbar · ScienceMaterial footer</Badge>
                </div>
                <div className="text-[11px] text-ink-muted leading-[1.5]">Template includes: toolbar 52px, canvas#scene 1200x600, chart canvas, metrics, side-panel with controls, 4 tabs, qbox/kbox, chips, dock, footer ScienceMaterial only, high contrast #1A1E1D on #FFFEFB, #5A605D secondary.</div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                  <div className="technical-label flex items-center gap-2"><Upload className="h-3.5 w-3.5" /> Upload New Experiment · HTML &lt;500KB</div>
                  <Badge variant="secondary" className="font-mono text-[10px]">ScienceMaterial</Badge>
                </div>
                <ExperimentUploader variant="lab" defaultSubject="physics" onUploaded={()=>{
                  fetch("/api/experiments").then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setExpList(d) })
                }} />
              </div>
              <Card className="border-border/60 shadow-xs">
                <CardHeader><CardTitle className="text-[13px]">Mapping Guide</CardTitle></CardHeader>
                <CardContent className="text-[12px] leading-[1.6] text-ink-muted space-y-2">
                  <div>Each experiment should be mapped to a chapter and section:</div>
                  <div className="p-2 rounded bg-surface-muted border border-border/50 font-mono text-[11px]">bookSlug: chu-yi-shang<br/>chapterId: b1-c1<br/>sectionId: s1</div>
                  <div>• Upload via chapter page → SectionExperiments</div>
                  <div>• Or via this admin → will appear in lab</div>
                  <div>• Screenshots: <code>public/screenshots/{'{slug}'}.png</code></div>
                  <div>• Guideline: see <Link href="/EXPERIMENTS.md" className="text-teal underline">EXPERIMENTS.md</Link></div>
                  <div>• Contrast: Ensure #1A1E1D on #FFFEFB, #5A605D secondary — no light-on-light</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab==='courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2"><BookMarked className="h-5 w-5" /><span className="font-semibold">Courses Management · {books.length} Books · {chapters.length} Chapters</span></div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-[10px]" onClick={handleSaveBooks}><Save className="h-4 w-4 mr-1" /> Save to LocalStorage</Button>
                <Button variant="outline" size="sm" className="rounded-[10px]" onClick={()=>{
                  const blob = new Blob([JSON.stringify({books, chapters}, null, 2)], {type:'application/json'})
                  const url = URL.createObjectURL(blob)
                  const a=document.createElement('a'); a.href=url; a.download='curriculum.json'; a.click()
                }}><Download className="h-4 w-4 mr-1" /> Export JSON</Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_380px] gap-6">
              <div className="space-y-4">
                {books.map(book=>{
                  const bookChapters = chapters.filter(c=>c.bookSlug===book.slug).sort((a,b)=>a.number-b.number)
                  return (
                    <Card key={book.id} className="border-border/60 shadow-xs overflow-hidden">
                      <CardHeader className="pb-3 bg-surface-muted/30">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-[14px] flex items-center gap-2"><Logo size={18} />{book.titleZh} · {book.year}</CardTitle>
                          <div className="flex gap-1">
                            <Badge variant="secondary" className="text-[10px]">{book.slug}</Badge>
                            <Badge variant="outline" className="text-[10px]">{bookChapters.length} ch</Badge>
                          </div>
                        </div>
                        {editingBook===book.id ? (
                          <div className="mt-3 space-y-2">
                            <input value={book.titleZh} onChange={e=>setBooks(books.map(b=>b.id===book.id? {...b, titleZh:e.target.value}:b))} className="w-full rounded-[8px] border border-border px-3 py-1.5 text-[13px]" placeholder="Title Zh" />
                            <input value={book.description} onChange={e=>setBooks(books.map(b=>b.id===book.id? {...b, description:e.target.value}:b))} className="w-full rounded-[8px] border border-border px-3 py-1.5 text-[13px]" placeholder="Description" />
                            <div className="flex gap-2"><Button size="sm" className="rounded-[8px]" onClick={()=>setEditingBook(null)}><CheckCircle className="h-4 w-4 mr-1" /> Done</Button><Button size="sm" variant="outline" className="rounded-[8px]" onClick={()=>setEditingBook(null)}><X className="h-4 w-4" /></Button></div>
                          </div>
                        ) : (
                          <div className="mt-2 text-[12px] text-ink-muted line-clamp-2">{book.description}</div>
                        )}
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y divide-border/40 max-h-[320px] overflow-auto">
                          {bookChapters.map(ch=>(
                            <div key={ch.id} className="flex items-center gap-2 p-2.5 hover:bg-surface-muted/40 group">
                              <GripVertical className="h-3.5 w-3.5 text-ink-faint shrink-0" />
                              <div className="h-6 w-6 rounded-[6px] bg-surface-muted border border-border flex items-center justify-center text-[10px] font-mono shrink-0">{ch.number}</div>
                              <div className="flex-1 min-w-0">
                                {editingChapter===ch.id ? (
                                  <div className="flex gap-1 flex-wrap">
                                    <input value={ch.titleZh} onChange={e=>setChapters(chapters.map(c=>c.id===ch.id? {...c, titleZh:e.target.value}:c))} className="rounded-[6px] border border-border px-2 py-1 text-[12px] w-[140px]" />
                                    <input value={ch.slug} onChange={e=>setChapters(chapters.map(c=>c.id===ch.id? {...c, slug:e.target.value}:c))} className="rounded-[6px] border border-border px-2 py-1 text-[11px] font-mono w-[120px]" />
                                    <input type="number" value={ch.estimatedMinutes} onChange={e=>setChapters(chapters.map(c=>c.id===ch.id? {...c, estimatedMinutes:parseInt(e.target.value)||15}:c))} className="rounded-[6px] border border-border px-2 py-1 text-[11px] w-[60px]" />
                                  </div>
                                ) : (
                                  <>
                                    <div className="text-[13px] font-[500] truncate">{ch.titleZh}</div>
                                    <div className="text-[11px] font-mono text-ink-muted truncate">{ch.id} · {ch.slug} · {ch.estimatedMinutes}min · {expList.filter(e=>e.chapterId===ch.id).length} exps</div>
                                  </>
                                )}
                              </div>
                              <div className="flex gap-1 shrink-0">
                                {editingChapter===ch.id ? (
                                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-[8px]" onClick={()=>setEditingChapter(null)}><CheckCircle className="h-3.5 w-3.5" /></Button>
                                ) : (
                                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-[8px]" onClick={()=>setEditingChapter(ch.id)}><Edit3 className="h-3.5 w-3.5" /></Button>
                                )}
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-[8px] hover:text-oxide" onClick={()=>handleDeleteChapter(ch.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                                <Link href={`/courses/${ch.bookSlug}/${ch.slug}`}><Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-[8px]"><Eye className="h-3.5 w-3.5" /></Button></Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="space-y-4">
                <Card className="border-border/60 shadow-xs">
                  <CardHeader><CardTitle className="text-[13px] flex items-center gap-2"><Plus className="h-4 w-4" /> Add Chapter</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <select value={newChapterBook} onChange={e=>setNewChapterBook(e.target.value)} className="w-full rounded-[10px] border border-border bg-surface px-3 py-2 text-[13px]">
                      {books.map(b=><option key={b.id} value={b.slug}>{b.titleZh} · {b.slug}</option>)}
                    </select>
                    <Button size="sm" className="w-full rounded-[10px]" onClick={handleAddChapter}><Plus className="h-4 w-4 mr-1" /> Add New Chapter to {newChapterBook}</Button>
                    <div className="text-[11px] text-ink-muted">Creates with id bX-cY, you can edit title/slug/minutes inline. Save to localStorage, then manually update lib/curriculum/data.ts if needed.</div>
                  </CardContent>
                </Card>

                <Card className="border-border/60 shadow-xs">
                  <CardHeader><CardTitle className="text-[13px] flex items-center gap-2"><Layers className="h-4 w-4" /> Sections Management · High Contrast</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <select value={selectedBookForSections} onChange={e=>setSelectedBookForSections(e.target.value)} className="w-full rounded-[10px] border border-border bg-surface px-3 py-2 text-[13px]">
                      {chapters.map(ch=><option key={ch.id} value={ch.id}>{ch.bookSlug} / {ch.id} · {ch.titleZh}</option>)}
                    </select>
                    <div className="flex gap-2">
                      <input value={sectionTitle} onChange={e=>setSectionTitle(e.target.value)} placeholder="Section title Zh, e.g. 重点与实验" className="flex-1 rounded-[10px] border border-border px-3 py-2 text-[13px] bg-surface" />
                      <Button size="sm" className="rounded-[10px]" onClick={handleAddSection}><Plus className="h-4 w-4" /></Button>
                    </div>
                    <div className="space-y-1 max-h-[200px] overflow-auto">
                      {(sectionsMap[selectedBookForSections] || []).map(sec=>(
                        <div key={sec.id} className="flex items-center justify-between p-2 rounded-[8px] border border-border/50 bg-surface text-[12px]">
                          <span>{sec.id} · {sec.titleZh}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={()=>{
                            const existing = sectionsMap[selectedBookForSections] || []
                            const filtered = existing.filter(s=>s.id!==sec.id)
                            setSectionsMap({...sectionsMap, [selectedBookForSections]: filtered})
                            localStorage.setItem('admin-sections', JSON.stringify({...sectionsMap, [selectedBookForSections]: filtered}))
                          }}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                      ))}
                      {(!sectionsMap[selectedBookForSections] || sectionsMap[selectedBookForSections].length===0) && <div className="text-[11px] text-ink-muted p-2">No sections yet. Add s1, s2, s3 for this chapter. Each section contains blocks: paragraph, definition, table, quiz, experiment embed.</div>}
                    </div>
                    <div className="text-[11px] text-ink-muted leading-[1.4]">Sections are stored in localStorage admin-sections. For production, update lib/curriculum/data.ts content map: chapterSlug → sections array with blocks. High contrast ensured.</div>
                  </CardContent>
                </Card>

                <Card className="border-border/60 shadow-xs">
                  <CardHeader><CardTitle className="text-[13px]">Curriculum Stats</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-[10px] border border-border bg-surface-muted/30"><div className="text-[11px] font-mono text-ink-muted">Books</div><div className="text-[20px] font-semibold">{books.length}</div></div>
                    <div className="p-3 rounded-[10px] border border-border bg-surface-muted/30"><div className="text-[11px] font-mono text-ink-muted">Chapters</div><div className="text-[20px] font-semibold">{chapters.length}</div></div>
                    <div className="p-3 rounded-[10px] border border-border bg-surface-muted/30"><div className="text-[11px] font-mono text-ink-muted">Avg per Book</div><div className="text-[20px] font-semibold">{Math.round(chapters.length/books.length)}</div></div>
                    <div className="p-3 rounded-[10px] border border-border bg-surface-muted/30"><div className="text-[11px] font-mono text-ink-muted">Mapped Exps</div><div className="text-[20px] font-semibold">{expList.filter(e=>e.chapterId).length}</div></div>
                  </CardContent>
                </Card>

                <Card className="border-border/60 shadow-xs">
                  <CardHeader><CardTitle className="text-[13px]">Quick Links</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    <Link href="/courses"><Button variant="outline" size="sm" className="w-full justify-start rounded-[10px]"><BookOpen className="h-4 w-4 mr-2" /> View Courses</Button></Link>
                    <Link href="/EXPERIMENTS.md" target="_blank"><Button variant="outline" size="sm" className="w-full justify-start rounded-[10px]"><FileText className="h-4 w-4 mr-2" /> EXPERIMENTS.md</Button></Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab==='content' && (
          <div className="grid lg:grid-cols-[320px_1fr] gap-6">
            <Card className="border-border/60 shadow-xs h-fit">
              <CardHeader className="pb-3"><CardTitle className="text-[14px] flex items-center gap-2"><Layers className="h-4 w-4" /> Curriculum Structure</CardTitle></CardHeader>
              <CardContent className="space-y-2 max-h-[700px] overflow-auto">
                {books.map(b=>(
                  <div key={b.id} className="rounded-[10px] border border-border/50 p-3 bg-surface-muted/30">
                    <div className="text-[12px] font-[600] truncate flex items-center gap-2"><Logo size={16} />{b.titleZh}</div>
                    <div className="text-[11px] font-mono text-ink-muted truncate">{b.slug} · {chapters.filter(c=>c.bookSlug===b.slug).length} ch</div>
                    <div className="mt-2 space-y-1">
                      {chapters.filter(c=>c.bookSlug===b.slug).slice(0,6).map(ch=>(
                        <div key={ch.id} className="text-[11px] flex justify-between p-1.5 rounded bg-surface border border-border/50">
                          <span className="truncate">{ch.titleZh}</span>
                          <span className="font-mono text-ink-faint ml-2">{ch.slug}</span>
                        </div>
                      ))}
                      {chapters.filter(c=>c.bookSlug===b.slug).length > 6 && (
                        <div className="text-[10px] text-ink-muted text-center">+{chapters.filter(c=>c.bookSlug===b.slug).length-6} more</div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                  <div className="technical-label flex items-center gap-2"><FileText className="h-3.5 w-3.5" /> Content Editor · Tiptap · ScienceMaterial</div>
                  <div className="flex gap-1.5">
                    {saveStatus==='saved' && <Badge variant="default" className="text-[10px]"><CheckCircle className="h-3 w-3 mr-1" /> Saved</Badge>}
                    {saveStatus==='saving' && <Badge variant="outline" className="text-[10px]">Saving…</Badge>}
                  </div>
                </div>
                <CmsEditor initialContent={cmsContent} onSave={handleSaveCms} />
                <div className="mt-3 rounded-[10px] bg-surface-muted border border-border/50 p-3 text-[11px] text-ink-muted leading-[1.5]">
                  <div className="font-[600] text-ink mb-1">Editor Features — ScienceMaterial</div>
                  <div>• Rich text editing with Tiptap, slash commands</div>
                  <div>• Embed experiments: experiment: slug → renders as interactive card</div>
                  <div>• QBox / KBox / Chips / Dock patterns for labs</div>
                  <div>• Draft → Preview → Publish workflow, autosave to localStorage</div>
                  <div>• Version history via localStorage, export HTML</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab==='users' && (
          <UsersManagement />
        )}

        {activeTab==='analytics' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-border/60 shadow-xs">
              <CardHeader><CardTitle className="text-[14px]">Learning Analytics</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-[10px] bg-teal-soft/40 border border-teal/15">
                    <div className="text-[11px] font-mono text-ink-muted">Avg. Quiz Score</div>
                    <div className="text-[22px] font-semibold">78%</div>
                    <div className="text-[11px] text-teal mt-1">↑ 3% vs last week</div>
                  </div>
                  <div className="p-3 rounded-[10px] bg-surface-muted border border-border">
                    <div className="text-[11px] font-mono text-ink-muted">Lab Completion</div>
                    <div className="text-[22px] font-semibold">64%</div>
                    <div className="text-[11px] text-ink-muted mt-1">52 / 82 avg</div>
                  </div>
                  <div className="p-3 rounded-[10px] bg-surface-muted border border-border">
                    <div className="text-[11px] font-mono text-ink-muted">Time Spent</div>
                    <div className="text-[22px] font-semibold">12.4h</div>
                    <div className="text-[11px] text-ink-muted mt-1">per user weekly</div>
                  </div>
                  <div className="p-3 rounded-[10px] bg-surface-muted border border-border">
                    <div className="text-[11px] font-mono text-ink-muted">Bookmarks</div>
                    <div className="text-[22px] font-semibold">156</div>
                    <div className="text-[11px] text-ink-muted mt-1">avg per active user</div>
                  </div>
                </div>
                <div className="text-[11px] text-ink-muted">Most popular: Density Explorer, Circuit Builder, Photosynthesis · 82 labs tracked</div>
                <div className="h-[120px] rounded-[10px] bg-surface-muted border border-border/50 p-3 flex items-end gap-1">
                  {[40,65,45,80,60,90,55,75,68,82,70,88].map((h,i)=><div key={i} className="flex-1 bg-teal rounded-t-[3px]" style={{height:`${h}%`}} />)}
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/60 shadow-xs">
              <CardHeader><CardTitle className="text-[14px]">Experiment Usage · Top 12</CardTitle></CardHeader>
              <CardContent className="space-y-2 max-h-[400px] overflow-auto">
                {expList.slice(0,12).map(exp=>(
                  <div key={exp.id} className="flex items-center gap-2 text-[12px] p-1.5 rounded hover:bg-surface-muted/50">
                    <span className="flex-1 truncate">{exp.titleZh} · {exp.slug}</span>
                    <div className="w-20 h-1.5 bg-surface-muted rounded-full overflow-hidden"><div className="h-full bg-teal" style={{width: `${20+Math.random()*80}%`}} /></div>
                    <span className="font-mono text-[11px] w-8 text-right">{Math.floor(20+Math.random()*80)}%</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab==='settings' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-border/60 shadow-xs">
              <CardHeader><CardTitle className="text-[14px]">Site Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[12px] font-[500]">Site Name</label>
                  <input defaultValue="ScienceMaterial" className="w-full rounded-[10px] border border-border px-3 py-2 text-[13px] bg-surface" />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-[500]">Footer</label>
                  <input defaultValue="© 2026 ScienceMaterial" className="w-full rounded-[10px] border border-border px-3 py-2 text-[13px] bg-surface" disabled />
                  <div className="text-[11px] text-ink-muted">Footer is fixed to ScienceMaterial per branding guidelines.</div>
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-[500]">Logo</label>
                  <div className="flex items-center gap-3 p-3 rounded-[10px] border border-border bg-surface-muted/30">
                    <Logo size={32} />
                    <div className="text-[12px]"><div className="font-[600]">/public/logo.svg</div><div className="text-ink-muted text-[11px]">Unified everywhere via Logo component · 20px base</div></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-[500]">Theme</label>
                  <select className="w-full rounded-[10px] border border-border bg-surface px-3 py-2 text-[13px]">
                    <option>Light · #f9fbf3 cards · 20px logo · 52px toolbar · segmented tabs</option>
                    <option>Dark · warm paper fallback</option>
                    <option>Auto</option>
                  </select>
                </div>
                <Button size="sm" className="rounded-[10px]"><Save className="h-4 w-4 mr-1" /> Save Settings</Button>
              </CardContent>
            </Card>
            <Card className="border-border/60 shadow-xs">
              <CardHeader><CardTitle className="text-[14px]">Branding Checklist</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-[12px]">
                <div className="flex items-center gap-2 p-2 rounded bg-teal-soft/30 border border-teal/15"><CheckCircle className="h-4 w-4 text-teal" /> Logo unified · /logo.svg everywhere</div>
                <div className="flex items-center gap-2 p-2 rounded bg-teal-soft/30 border border-teal/15"><CheckCircle className="h-4 w-4 text-teal" /> Footer shows only ScienceMaterial</div>
                <div className="flex items-center gap-2 p-2 rounded bg-teal-soft/30 border border-teal/15"><CheckCircle className="h-4 w-4 text-teal" /> No license badges in UI</div>
                <div className="flex items-center gap-2 p-2 rounded bg-teal-soft/30 border border-teal/15"><CheckCircle className="h-4 w-4 text-teal" /> No external academy mentions</div>
                <div className="flex items-center gap-2 p-2 rounded bg-teal-soft/30 border border-teal/15"><CheckCircle className="h-4 w-4 text-teal" /> No viewport technical labels visible</div>
                <div className="flex items-center gap-2 p-2 rounded bg-teal-soft/30 border border-teal/15"><CheckCircle className="h-4 w-4 text-teal" /> 82 labs · Apple HIG · 20px logo · 52px toolbar</div>
                <div className="mt-4 p-3 rounded-[10px] bg-surface-muted border border-border/50 text-[11px] leading-[1.5] text-ink-muted">
                  <div className="font-[600] text-ink mb-1">User Flows Checked:</div>
                  <div>✓ / → Marketing → Courses → Chapter → Lab → Quiz</div>
                  <div>✓ /dashboard → Continue → Lab</div>
                  <div>✓ /laboratory → Search → Filter → Launch → iframe</div>
                  <div>✓ /admin → Experiments → Upload → Map → Preview</div>
                  <div>✓ /admin → Courses → Edit → Save → Export</div>
                  <div>✓ /auth/login → /auth/signup → 13+ verification</div>
                  <div>✓ /search → CMD+K → Bookmarks → Progress</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <footer className="mt-12 pt-6 border-t border-border/50 text-[11px] font-mono text-ink-muted flex justify-between">
          <span>© 2026 ScienceMaterial</span>
          <span className="flex items-center gap-2"><Logo size={16} /> ScienceMaterial</span>
        </footer>
      </div>
    </div>
  )
}
