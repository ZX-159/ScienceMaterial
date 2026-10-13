"use client"
import { useEditor, EditorContent } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { Placeholder } from "@tiptap/extension-placeholder"
import { Table } from "@tiptap/extension-table"
import { TableRow } from "@tiptap/extension-table-row"
import { TableCell } from "@tiptap/extension-table-cell"
import { TableHeader } from "@tiptap/extension-table-header"
import { Image } from "@tiptap/extension-image"
import { Link } from "@tiptap/extension-link"
import { Highlight } from "@tiptap/extension-highlight"
import { Underline } from "@tiptap/extension-underline"
import { TextAlign } from "@tiptap/extension-text-align"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bold, Italic, Underline as UnderlineIcon, List, Table as TableIcon, Image as ImageIcon, Link as LinkIcon, Code, Quote, Heading2, FlaskConical, HelpCircle, Highlighter, Lightbulb, BarChart3, ClipboardList } from "lucide-react"

interface Props {
  initialContent?: string
  onSave?: (content: string) => void
}

export function CmsEditor({ initialContent = "", onSave }: Props) {
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(false)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      Placeholder.configure({ placeholder: "开始编写课程内容… 支持中文，科学公式、实验嵌入、测验检查点、交互式模块。 输入 / 触发命令菜单" }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      Link.configure({ openOnClick: false }),
      Highlight,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: initialContent || `
      <h2>科学测量 · 仪器与不确定度</h2>
      <p><strong>拖一拖、调一调，把抽象概念变成看得见的动画</strong>。本章采用 4 个标签页 ①实验台②图表·数据③要点·公式④测验，题目驱动，可折叠解释，实时数据芯片，底部常驻控制。</p>
      <div class="qbox"><span class="qtag">题目</span>把质量 1 kg 的摆球拉到 <b>θ = 30°</b>（比最低点高 <b>h₀ = 0.12 m</b>）后放手。摆到最低点时速度多大？</div>
      <p>能量账本：<code>橙色动能和青色势能此消彼长，总长度不变</code>——这就是机械能守恒。最高点全是势能，最低点全是动能。</p>
      <div class="kbox"><b>看下方的能量条：橙色动能和青色势能此消彼长，总长度不变</b>——这就是机械能守恒。最高点全是势能，最低点全是动能，中间在两者之间来回换。</div>
      <div class="kbox red">⚠️ 打开<b>空气阻力</b>后，彩条越来越短，缺口标着「→ 变成热」：机械能没有消失，而是被摩擦变成了<b>内能</b>。</div>
      <h3>单位与国际单位制</h3>
      <table><tbody><tr><th>量的名称</th><th>单位名称</th><th>单位符号</th><th>交互</th></tr><tr><td>长度</td><td>米</td><td>m</td><td>拖动尺子直接读</td></tr><tr><td>质量</td><td>千克</td><td>kg</td><td>去皮+月球g</td></tr><tr><td>时间</td><td>秒</td><td>s</td><td>反应时间+20次平均</td></tr></tbody></table>
      <p>实验嵌入：<code>experiment: resistance-factors-lab</code> 将在阅读视图中渲染为交互式实验卡片，包含控制面板、实时数据、题目、解释、标签页、测验。</p>
      <div data-type="experiment" data-id="resistance-factors-lab">[Experiment] experiment: resistance-factors-lab · 导体电阻影响因素实验室</div>
      <div data-type="experiment" data-id="echo-sonar-lab">[Experiment] experiment: echo-sonar-lab · 回声与声呐 t=2d/v</div>
      <div data-type="quiz" data-id="b1-c3-q1">[Quiz] quiz: b1-c3-q1 · 一次答对计分</div>
    `,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[380px] p-6 text-[14px] leading-[1.8] tracking-[-0.01em] break-words",
      },
    },
    immediatelyRender: false,
  })

  useEffect(()=>{
    if(initialContent && editor){
      editor.commands.setContent(initialContent)
    }
  }, [initialContent, editor])

  const handleSave = () => {
    if (!editor) return
    setSaving(true)
    const html = editor.getHTML()
    onSave?.(html)
    localStorage.setItem('cms-draft', html)
    fetch('/api/sync', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'cms', content: html }) }).catch(()=>{})
    setTimeout(() => setSaving(false), 600)
  }

  if (!editor) return (
    <Card className="border-border/60 shadow-xs">
      <CardContent className="p-6 text-[13px] text-ink-muted">Loading editor… Tiptap + ScienceMaterial blocks</CardContent>
    </Card>
  )

  return (
    <div className="space-y-3 min-w-0">
      <Card className="overflow-hidden border-border/60 shadow-xs">
        <div className="border-b border-border/60 bg-surface-muted/50 p-2 flex flex-wrap gap-1 items-center">
          <div className="flex gap-1 mr-2 border-r border-border/60 pr-2">
            <Button variant={editor.isActive("bold") ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0 rounded-[8px]" onClick={() => editor.chain().focus().toggleBold().run()} aria-label="Bold"><Bold className="h-4 w-4" /></Button>
            <Button variant={editor.isActive("italic") ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0 rounded-[8px]" onClick={() => editor.chain().focus().toggleItalic().run()} aria-label="Italic"><Italic className="h-4 w-4" /></Button>
            <Button variant={editor.isActive("underline") ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0 rounded-[8px]" onClick={() => editor.chain().focus().toggleUnderline().run()} aria-label="Underline"><UnderlineIcon className="h-4 w-4" /></Button>
            <Button variant={editor.isActive("highlight") ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0 rounded-[8px]" onClick={() => editor.chain().focus().toggleHighlight().run()} aria-label="Highlight"><Highlighter className="h-4 w-4" /></Button>
          </div>
          <div className="flex gap-1 mr-2 border-r border-border/60 pr-2">
            <Button variant={editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0 rounded-[8px]" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} aria-label="Heading"><Heading2 className="h-4 w-4" /></Button>
            <Button variant={editor.isActive("bulletList") ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0 rounded-[8px]" onClick={() => editor.chain().focus().toggleBulletList().run()} aria-label="List"><List className="h-4 w-4" /></Button>
            <Button variant={editor.isActive("blockquote") ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0 rounded-[8px]" onClick={() => editor.chain().focus().toggleBlockquote().run()} aria-label="Quote"><Quote className="h-4 w-4" /></Button>
            <Button variant={editor.isActive("codeBlock") ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0 rounded-[8px]" onClick={() => editor.chain().focus().toggleCodeBlock().run()} aria-label="Code"><Code className="h-4 w-4" /></Button>
          </div>
          <div className="flex gap-1 flex-wrap">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-[8px]" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} aria-label="Table"><TableIcon className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-[8px]" onClick={() => { const url = window.prompt("Image URL"); if (url) editor.chain().focus().setImage({ src: url }).run() }} aria-label="Image"><ImageIcon className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-[8px]" onClick={() => { const url = window.prompt("Link URL"); if (url) editor.chain().focus().setLink({ href: url }).run() }} aria-label="Link"><LinkIcon className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 px-2.5 gap-1 rounded-[8px] text-[11px]" onClick={() => editor.chain().focus().insertContent('<div data-type="experiment" data-id="resistance-factors-lab">[Experiment] experiment: resistance-factors-lab · 导体电阻影响因素</div>').run()}><FlaskConical className="h-4 w-4" /> Experiment</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2.5 gap-1 rounded-[8px] text-[11px]" onClick={() => editor.chain().focus().insertContent('<div data-type="quiz" data-id="b1-c3-q1">[Quiz] quiz: b1-c3-q1</div>').run()}><HelpCircle className="h-4 w-4" /> Quiz</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2.5 gap-1 rounded-[8px] text-[11px]" onClick={() => editor.chain().focus().insertContent('<div class="qbox"><span class="qtag">题目</span>把质量 1 kg 的摆球拉到 <b>θ = 30°</b> 后放手，摆到最低点速度多大？</div>').run()}><ClipboardList className="h-4 w-4" /> QBox</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2.5 gap-1 rounded-[8px] text-[11px]" onClick={() => editor.chain().focus().insertContent('<div class="kbox"><b>看下方的能量条：橙色动能和青色势能此消彼长，总长度不变</b>——这就是机械能守恒。</div>').run()}><Lightbulb className="h-4 w-4" /> KBox</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2.5 gap-1 rounded-[8px] text-[11px]" onClick={() => editor.chain().focus().insertContent('<div class="statline"><span class="chip hl big">R = 2.34 Ω</span><span class="chip">L=1.0m</span><span class="chip blu">A=1.00mm²</span></div>').run()}><BarChart3 className="h-4 w-4" /> Chips</Button>
          </div>
          <div className="ml-auto flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="font-mono text-[10px] whitespace-nowrap">Tiptap · ScienceMaterial blocks</Badge>
            <Badge variant="outline" className="font-mono text-[10px] whitespace-nowrap">Autosave · Supabase</Badge>
          </div>
        </div>
        <CardContent className="p-0">
          {preview ? (
            <div className="min-h-[380px] p-6 bg-surface prose prose-sm max-w-none text-[14px] leading-[1.8]" dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
          ) : (
            <EditorContent editor={editor} className="min-h-[380px] bg-surface" />
          )}
        </CardContent>
        <div className="border-t border-border/60 bg-surface-muted/30 p-3 flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" className="rounded-[10px] h-8" onClick={handleSave} disabled={saving}>{saving ? "Saving…" : "Save Draft"}</Button>
          <Button size="sm" variant="outline" className="rounded-[10px] h-8" onClick={()=>setPreview(!preview)}>{preview ? "Edit" : "Preview"}</Button>
          <Button size="sm" className="rounded-[10px] h-8" onClick={handleSave}>Publish · Supabase</Button>
          <span className="ml-auto text-[11px] font-mono text-ink-muted break-words">ScienceMaterial · 82 labs · Supabase RLS</span>
        </div>
      </Card>

      <div className="rounded-[12px] bg-surface-muted border border-border/60 p-3 text-[11px] leading-[1.6] text-ink-muted break-words space-y-2">
        <div className="font-[600] text-ink tracking-[-0.01em]">Block Types — ScienceMaterial</div>
        <div><b>qbox</b>: 题目驱动, 当前参数生成题目, 左黑边, qtag标签</div>
        <div><b>kbox</b>: 要点盒, 左色边, 可折叠, 支持 .exp 折叠</div>
        <div><b>chips</b>: 实时数据, hl大芯片, 普通, blu, grn, teal</div>
        <div><b>dock</b>: 底部常驻控制, range滑块+数值+切换+按钮, 可折叠</div>
        <div><b>tabs</b>: ①实验台②图表·数据③要点·公式④测验, 独立渲染</div>
        <div><b>quiz</b>: 一次答对计分, 错题解析, 答对解锁下一题</div>
        <div><b>direct drag</b>: 直接拖摆球/导线手柄, 不是仅滑块</div>
        <div>Workflow: Draft → Edit → Preview → Validation → Publish → Version snapshot. Experiments: POST /api/experiments → public/experiments/*.html, iframe sandbox allow-scripts only, postMessage API.</div>
      </div>
    </div>
  )
}
