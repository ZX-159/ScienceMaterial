import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { books } from "@/lib/curriculum/data"
import { experiments } from "@/lib/experiments/data"
import { ArrowRight, FlaskConical, BookOpen, Atom, Zap, Eye, Sparkles, Beaker } from "lucide-react"
import { IconPhysics, IconChemistry, IconBiology, IconEarth, IconSpace } from "@/components/ui/custom-icons"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-teal-soft">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-background" />
          <div className="absolute top-[-18%] right-[-8%] w-[760px] h-[760px] rounded-full bg-teal-soft/40 blur-[120px]" />
          <div className="absolute bottom-[-12%] left-[-8%] w-[560px] h-[560px] rounded-full bg-brass-soft/50 blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 text-[11px] font-medium tracking-[-0.01em] max-w-full flex-wrap">
                <span className="h-2 w-2 rounded-full bg-teal animate-pulse shadow-[0_0_8px_rgba(15,107,103,0.4)] shrink-0" />
                <span className="text-ink-muted whitespace-nowrap">JUNIOR SECONDARY SCIENCE</span>
                <span className="h-3 w-px bg-border hidden sm:block" />
                <span className="font-mono text-[10px] text-ink-faint whitespace-nowrap">6 BOOKS · 64 CHAPTERS</span>
              </div>

              <h1 className="mt-7 text-[38px] lg:text-[54px] font-bold tracking-[-0.03em] leading-[0.92] text-balance">
                Learn science by
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-br from-teal to-blueprint bg-clip-text text-transparent">seeing how it works.</span>
                  <span className="absolute bottom-1 left-0 right-0 h-[9px] bg-teal-soft/70 -rotate-[0.8deg] -z-0 hidden lg:block rounded-[2px]" />
                </span>
              </h1>

              <p className="mt-5 text-[16px] lg:text-[17px] leading-[1.6] tracking-[-0.011em] text-ink-muted max-w-[560px] font-[450] text-pretty">
                Structured course material, interactive experiments, and revision tools for the complete Junior Secondary Science curriculum.
                <span className="block mt-3 font-mono text-[11px] tracking-[0.08em] text-ink-faint">READ → UNDERSTAND → EXPLORE → PRACTISE → REVIEW</span>
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/courses">
                  <Button size="lg" className="h-[44px] px-[22px] rounded-[14px] text-[15px] font-[600]">
                    Start Learning <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/laboratory">
                  <Button variant="secondary" size="lg" className="h-[44px] px-[22px] rounded-[14px] text-[15px] font-[500] border border-border">
                    <FlaskConical className="h-4 w-4" /> Explore Laboratory
                  </Button>
                </Link>
              </div>

              <div className="mt-9 grid grid-cols-3 gap-0 max-w-[440px] rounded-[16px] border border-border overflow-hidden shadow-xs">
                <div className="p-4 bg-surface border-r border-border min-w-0">
                  <div className="text-[26px] font-semibold tracking-[-0.02em] leading-none">64</div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mt-1.5">Chapters</div>
                  <div className="text-[11px] text-ink-faint mt-1 truncate">Structured content</div>
                </div>
                <div className="p-4 bg-surface border-r border-border min-w-0">
                  <div className="text-[26px] font-semibold tracking-[-0.02em] leading-none">{experiments.length}</div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mt-1.5">Experiments</div>
                  <div className="text-[11px] text-ink-faint mt-1 truncate">Interactive labs</div>
                </div>
                <div className="p-4 bg-surface min-w-0">
                  <div className="text-[26px] font-semibold tracking-[-0.02em] leading-none">100%</div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mt-1.5">Chinese</div>
                  <div className="text-[11px] text-ink-faint mt-1 truncate">English UI</div>
                </div>
              </div>
            </div>

            <div className="relative lg:h-[540px] min-w-0">
              <div className="relative h-full rounded-[24px] border border-border bg-surface overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.07),0_0_0_1px_rgba(0,0,0,0.03)]">
                <div className="h-[44px] border-b border-border/60 bg-surface-muted/50 backdrop-blur-xl flex items-center px-4 gap-2">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="h-3 w-3 rounded-full bg-oxide/70" />
                    <div className="h-3 w-3 rounded-full bg-brass/70" />
                    <div className="h-3 w-3 rounded-full bg-mineral/70" />
                  </div>
                  <div className="ml-3 flex items-center gap-2 text-[12px] font-[550] tracking-[-0.01em] min-w-0">
                    <Atom className="h-4 w-4 text-teal shrink-0" />
                    <span className="truncate">Science Map</span>
                    <span className="text-ink-faint hidden sm:inline">·</span>
                    <span className="text-ink-muted hidden sm:inline whitespace-nowrap">Progress 68%</span>
                  </div>
                  <Badge variant="mineral" className="ml-auto text-[10px] shrink-0">Live</Badge>
                </div>

                <div className="p-4 sm:p-5 space-y-4 bg-gradient-to-b from-surface to-surface-muted/20">
                  <div className="grid grid-cols-3 gap-2.5">
                    {books.map((book, i) => (
                      <div key={book.id} className="group rounded-[12px] border border-border bg-background p-3 shadow-xs hover:shadow-sm transition-all hover:-translate-y-0.5 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-[6px] bg-surface-muted border border-border whitespace-nowrap">{book.year}</span>
                          <span className="text-[10px] font-mono text-ink-faint whitespace-nowrap">{60 + i * 7}%</span>
                        </div>
                        <div className="text-[11px] font-semibold mt-2 leading-tight tracking-[-0.01em] break-words line-clamp-2">{book.titleZh.replace('第一册·','').replace('第二册·','').replace('第三册·','').replace('第四册·','').replace('第五册·','').replace('第六册·','')}</div>
                        <div className="mt-2.5 h-1 bg-surface-muted rounded-full overflow-hidden">
                          <div className="h-full bg-teal rounded-full" style={{ width: `${60 + i * 7}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[16px] border border-teal/15 bg-teal-soft/40 p-4 shadow-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-11 w-11 rounded-[12px] bg-teal flex items-center justify-center shadow-[0_4px_12px_rgba(15,107,103,0.25)] shrink-0">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold tracking-[-0.01em] truncate">初二上册 · 第十章 · 电路</div>
                        <div className="text-[11px] text-ink-muted mt-0.5 flex items-center gap-1.5 flex-wrap">
                          <span>Continue Learning</span>
                          <span className="h-1 w-1 rounded-full bg-ink-faint shrink-0" />
                          <span>12 min left</span>
                        </div>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center shadow-xs shrink-0">
                        <ArrowRight className="h-4 w-4 text-ink-muted" />
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      <div className="rounded-[12px] bg-surface border border-border p-3 shadow-xs min-w-0">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-ink-muted flex items-center gap-1">
                          <Eye className="h-3 w-3" /> Next
                        </div>
                        <div className="text-[12px] font-semibold mt-1 tracking-[-0.01em] truncate">欧姆定律</div>
                        <div className="text-[11px] text-ink-muted truncate">I = V/R</div>
                      </div>
                      <div className="rounded-[12px] bg-surface border border-border p-3 shadow-xs min-w-0">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">Quiz</div>
                        <div className="text-[12px] font-semibold mt-1 tracking-[-0.01em] truncate">电路检查点</div>
                        <div className="text-[11px] text-ink-muted truncate">6 questions · 72%</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[14px] glass p-3 flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-[10px] bg-surface border border-border flex items-center justify-center shadow-xs shrink-0">
                      <FlaskConical className="h-5 w-5 text-teal" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold truncate">Density Explorer — 密度探索器</div>
                      <div className="text-[11px] text-ink-muted truncate">ρ=m/V · F_b=ρV_disp g</div>
                    </div>
                    <div className="text-[11px] font-medium text-teal whitespace-nowrap shrink-0">Launch →</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-surface">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-14 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div className="min-w-0">
              <div className="technical-label mb-3 flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5" /> Curriculum · 课程总览
              </div>
              <h2 className="text-[26px] lg:text-[30px] font-semibold tracking-[-0.02em] leading-tight text-balance">The complete science curriculum, organized as a textbook index.</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted max-w-[640px] text-pretty">
                6 books, 64 chapters — structured learning path from measurement to energy.
              </p>
            </div>
            <Link href="/courses" className="hidden md:inline-flex items-center gap-1.5 text-[14px] font-medium text-teal hover:text-teal-pressed transition-colors shrink-0">
              View all courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map(book => (
              <Link key={book.id} href={`/courses/${book.slug}`} className="group min-w-0">
                <Card className="h-full card-hover border-border/60">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <Badge variant={book.color as any} className="font-mono text-[11px] shrink-0">{book.year}</Badge>
                      <span className="text-[11px] font-mono text-ink-muted tracking-wider whitespace-nowrap">{book.chapterCount} CHAPTERS</span>
                    </div>
                    <h3 className="text-[15px] font-semibold leading-tight tracking-[-0.01em] group-hover:text-teal transition-colors break-words">{book.titleZh}</h3>
                    <div className="text-[12px] text-ink-muted mt-1 tracking-[-0.01em] truncate">{book.titleEn}</div>
                    <div className="text-[13px] text-ink-muted mt-3 leading-[1.5] line-clamp-2 break-words">{book.description}</div>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-surface-muted rounded-full overflow-hidden">
                        <div className="h-full bg-teal rounded-full" style={{ width: "42%" }} />
                      </div>
                      <span className="text-[11px] font-mono text-ink-muted whitespace-nowrap">42%</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-background">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
            <div className="lg:sticky lg:top-24 min-w-0">
              <div className="technical-label mb-3 flex items-center gap-2">
                <FlaskConical className="h-3.5 w-3.5" /> Laboratory · 实验室
              </div>
              <h2 className="text-[26px] lg:text-[30px] font-semibold tracking-[-0.02em] leading-[1.1] text-balance">Interactive experiments that make abstract concepts tangible.</h2>
              <p className="mt-4 text-[14px] leading-[1.6] tracking-[-0.01em] text-ink-muted text-pretty">
                Each experiment is a single-file interactive application running in a sandboxed iframe. Immediate feedback, multiple representations, accurate physics.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                {[
                  { label: "Physics", zh: "力 · 光 · 电 · 波", Icon: IconPhysics },
                  { label: "Chemistry", zh: "酸碱 · 粒子 · pH", Icon: IconChemistry },
                  { label: "Biology", zh: "细胞 · 循环 · 光合", Icon: IconBiology },
                  { label: "Earth & Space", zh: "地球 · 月相 · 太阳系", Icon: IconEarth },
                ].map(item => (
                  <div key={item.label} className="rounded-[14px] border border-border bg-surface p-3.5 shadow-xs min-w-0">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
                      <item.Icon className="text-ink-muted" size={16} /> {item.label}
                    </div>
                    <div className="text-[13px] font-medium mt-1.5 tracking-[-0.01em] break-words">{item.zh}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[14px] glass p-4">
                <div className="text-[12px] font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-teal shrink-0" /> Design Principles
                </div>
                <div className="mt-2 text-[12px] leading-relaxed text-ink-muted break-words">
                  Accurate formulas: Snell n₁sinθ₁=n₂sinθ₂, Density ρ=m/V, Ohm V=IR, Lens 1/f=1/do+1/di. Multiple representations, playful exploration.
                </div>
              </div>

              <Link href="/laboratory" className="inline-flex mt-6">
                <Button className="rounded-[12px] h-[40px] px-5">Explore Laboratory <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 min-w-0">
              {experiments.slice(0, 6).map(exp => (
                <Link key={exp.id} href={`/laboratory/${exp.slug}`} className="group min-w-0">
                  <Card className="card-hover h-full">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge variant="secondary" className="text-[10px]">{exp.subject}</Badge>
                        <span className="text-[10px] font-mono text-ink-faint uppercase tracking-wider whitespace-nowrap">{exp.type}</span>
                      </div>
                      <div className="font-semibold text-[13px] tracking-[-0.01em] group-hover:text-teal transition-colors line-clamp-2 break-words">{exp.title}</div>
                      <div className="text-[12px] text-ink-muted mt-1 truncate">{exp.titleZh}</div>
                      <div className="mt-4 h-[84px] rounded-[12px] bg-surface-muted border border-border flex items-center justify-center group-hover:bg-teal-soft/40 transition-colors">
                        <FlaskConical className="h-6 w-6 text-ink-muted group-hover:text-teal transition-colors" />
                      </div>
                      <div className="mt-3 text-[11px] font-mono text-ink-muted line-clamp-2 break-words leading-[1.4]">{exp.description.slice(0, 56)}…</div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-surface">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-12 lg:py-14">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "READ", zh: "阅读", desc: "Structured textbook content, diagrams, definitions.", icon: BookOpen },
              { step: "02", title: "EXPLORE", zh: "探索", desc: "Interactive experiments, accurate physics, immediate feedback.", icon: Beaker },
              { step: "03", title: "PRACTISE", zh: "练习", desc: "Quizzes with explanations. Weak detection.", icon: Sparkles },
              { step: "04", title: "REVIEW", zh: "复习", desc: "Progress tracking, bookmarks, cross-device sync.", icon: Eye },
            ].map(item => (
              <div key={item.step} className="relative group min-w-0">
                <div className="h-8 w-8 rounded-[10px] bg-surface-muted border border-border flex items-center justify-center group-hover:bg-teal-soft group-hover:border-teal/20 transition-colors shrink-0">
                  <item.icon className="h-4 w-4 text-ink-muted group-hover:text-teal transition-colors" />
                </div>
                <div className="mt-3 text-[11px] font-mono text-ink-muted">{item.step}</div>
                <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                  <div className="text-[15px] font-semibold tracking-[-0.01em]">{item.title}</div>
                  <div className="text-[13px] text-ink-muted">{item.zh}</div>
                </div>
                <div className="text-[13px] text-ink-muted mt-2 leading-[1.5] tracking-[-0.01em] break-words">{item.desc}</div>
                <div className="mt-4 h-px bg-border group-hover:bg-teal/30 transition-colors w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 bg-background">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <Logo size={28} />
                <span className="font-semibold text-[14px] tracking-[-0.01em]">ScienceMaterial</span>
              </div>
              <div className="text-[12px] text-ink-muted mt-3 leading-[1.5] tracking-[-0.01em] break-words">
                Junior Secondary Science learning platform. English UI, Chinese content.
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-3">Platform</div>
              <div className="space-y-2.5 text-[13px] tracking-[-0.01em]">
                <Link href="/courses" className="block hover:text-teal transition-colors">Courses</Link>
                <Link href="/laboratory" className="block hover:text-teal transition-colors">Laboratory</Link>
                <Link href="/quizzes" className="block hover:text-teal transition-colors">Quizzes</Link>
                <Link href="/progress" className="block hover:text-teal transition-colors">Progress</Link>
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-3">Resources</div>
              <div className="space-y-2.5 text-[13px] tracking-[-0.01em]">
                <Link href="/privacy" className="block hover:text-teal transition-colors">Privacy</Link>
                <Link href="/terms" className="block hover:text-teal transition-colors">Terms</Link>
                <Link href="/cookies" className="block hover:text-teal transition-colors">Cookie Preferences</Link>
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-3">Design</div>
              <div className="text-[12px] text-ink-muted leading-[1.6] tracking-[-0.01em] break-words">
                6 books · 64 chapters<br />
                初一至初三完整课纲<br />
                Interactive learning
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-ink-muted">
            <div className="break-words">© 2026 ScienceMaterial</div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="whitespace-nowrap">ScienceMaterial</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
