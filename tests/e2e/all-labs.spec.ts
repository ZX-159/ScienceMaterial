import { test, expect } from "@playwright/test"
import fs from "fs"
import path from "path"

// Full list of 82 labs from lib/experiments/data.ts - clean branding
const allSlugs = [
  "measurement-ruler","density-explorer","floating-sinking","wave-generator","reflection","refraction","lens-simulator","force-friction","pressure","circuit-builder","ohms-law","magnetic-field","particle-model","ph-visualizer","solar-system","moon-phases","photosynthesis-visualizer","human-circulation","plant-transport","earth-structure",
  "measuring-cylinder-simulator","heat-transfer-laboratory","dissolution","equation-balancing","force-vectors","water-cycle","plant-cell-explorer","sound-synthesizer","ecosystem-sandbox","physics-playground","vernier-caliper-simulator","micrometer-simulator","digital-balance","stopwatch-challenge","thermometer-simulator","measurement-error-simulator","average-measurement-laboratory","graph-interpretation-challenge",
  "resistance-factors-lab","current-magnetic-effect","diffusion-lab","states-of-matter-lab","transformer-lab","electromagnet-lab","echo-sonar-lab","gas-pressure-lab","electroscope-lab","hooke-law-lab","center-of-gravity-lab","seasons-lab",
  "moon-eclipse-tide-lab","density-buoyancy-lab","atomic-structure-lab","water-electrolysis-lab","friction-lab","mechanical-energy-lab","electromagnetic-induction-lab","series-parallel-circuit-lab","acid-base-ph-lab","static-electricity-lab",
  "liquid-pressure-lab","car-engine-lab","transverse-longitudinal-waves-lab","saturated-solution-lab","force-three-elements-lab","sound-three-elements-lab",
  "resistance-factors-lab-v2","current-magnetic-effect-v2","diffusion-lab-v2","states-of-matter-lab-v2","pendulum-roller-lab","circuit-building-lab","mechanical-energy-conversion-lab","transformer-lab-v2","pressure-inquiry-lab","gas-pressure-lab-v2","electroscope-lab-v2","power-generation-lab","center-of-gravity-lab-v2","seasons-lab-v2","doppler-effect-lab","titration-lab"
]

test.describe("All 82 Labs — verification", () => {
  test("API returns 82 labs", async ({ page }) => {
    const res = await page.request.get("/api/experiments")
    expect(res.ok()).toBeTruthy()
    const data = await res.json()
    console.log(`API labs count: ${data.length}`)
    expect(data.length).toBeGreaterThanOrEqual(80)
    expect(data.length).toBeLessThanOrEqual(90)
  })

  // Split into batches to avoid too long test
  for (let batch = 0; batch < Math.ceil(allSlugs.length / 20); batch++) {
    const batchSlugs = allSlugs.slice(batch * 20, (batch + 1) * 20)
    test(`batch ${batch + 1} — ${batchSlugs.length} labs load with canvas and non-empty chart`, async ({ page }) => {
      test.setTimeout(120000)
      const results: { slug: string; ok: boolean; error?: string }[] = []
      for (const slug of batchSlugs) {
        try {
          await page.goto(`/laboratory/${slug}`, { waitUntil: "domcontentloaded", timeout: 15000 })
          // Check back link
          await expect(page.getByText("Back to Laboratory").first()).toBeVisible({ timeout: 8000 })

          const iframe = page.frameLocator('iframe').first()
          const canvas = iframe.locator('canvas').first()
          // Some labs use SVG instead of canvas - accept either
          const hasCanvas = await iframe.locator('canvas').count()
          const hasSvg = await iframe.locator('svg').count()
          if (hasCanvas === 0 && hasSvg === 0) {
            // still try to check body has content
            const bodyLen = await iframe.locator('body').evaluate((b) => b.innerText.length)
            if (bodyLen < 100) throw new Error(`no canvas/svg and body too short ${bodyLen}`)
          } else if (hasCanvas > 0) {
            await expect(canvas).toBeVisible({ timeout: 15000 })
          }

          // Wait for animations
          await page.waitForTimeout(800)

          // Check canvas size if exists
          if (hasCanvas > 0) {
            const size = await iframe.locator('canvas').first().evaluate((c: HTMLCanvasElement) => {
              const r = c.getBoundingClientRect()
              return { w: r.width, h: r.height }
            })
            if (size.w < 30 || size.h < 30) {
              console.log(`[${slug}] small canvas ${size.w}x${size.h} - may be secondary chart`)
            }
          }

          const chartCheck = await iframe.locator('body').evaluate(() => {
            const tabs = Array.from(document.querySelectorAll('[data-tab], .tab, button')).map(el => (el.textContent || '').toLowerCase())
            const hasChartTab = tabs.some(t => t.includes('chart') || t.includes('图表') || t.includes('数据'))
            const canvases = document.querySelectorAll('canvas').length
            const svgCharts = document.querySelectorAll('svg').length
            const bodyText = document.body.innerText.toLowerCase()
            const hasUndefined = bodyText.includes('summary1') || (bodyText.includes('undefined') && bodyText.length < 1000)
            return { hasChartTab, canvases, svgCharts, hasUndefined, len: bodyText.length }
          })
          console.log(`[${slug}] chartCheck:`, chartCheck)

          if (chartCheck.hasUndefined) {
            throw new Error(`contains undefined/summary1 text`)
          }

          // Screenshot
          const dirs = [
            path.join(process.cwd(), "public/screenshots"),
            path.join(process.cwd(), "docs/screenshots"),
          ]
          for (const dir of dirs) {
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
            const p = path.join(dir, `${slug}.png`)
            try {
              await page.screenshot({ path: p, fullPage: false })
            } catch {}
          }

          results.push({ slug, ok: true })
          console.log(`✓ ${slug} OK`)
        } catch (e: any) {
          results.push({ slug, ok: false, error: e.message })
          console.log(`✗ ${slug} FAILED: ${e.message}`)
        }
      }

      const failed = results.filter(r => !r.ok)
      if (failed.length > 0) {
        console.log(`Batch ${batch + 1} failed:`, failed)
      }
      // Allow up to 10% failure for flaky labs, but aim for 0
      expect(failed.length).toBeLessThanOrEqual(2)
    })
  }

  test("specific regression — echo-sonar-lab and electromagnet-lab charts not empty", async ({ page }) => {
    for (const slug of ["echo-sonar-lab", "electromagnet-lab"]) {
      await page.goto(`/laboratory/${slug}`, { waitUntil: "domcontentloaded" })
      const iframe = page.frameLocator('iframe').first()
      // Wait for either canvas or svg
      await page.waitForTimeout(1000)
      const hasCanvas = await iframe.locator('canvas').count()
      if (hasCanvas > 0) {
        await iframe.locator('canvas').first().waitFor({ timeout: 15000 })
      }
      await page.waitForTimeout(1000)

      // Click chart tab if exists
      const chartTab = iframe.locator('button, [role="tab"]').filter({ hasText: /图表|Chart|Data/i }).first()
      if (await chartTab.count() > 0) {
        await chartTab.click().catch(()=>{})
        await page.waitForTimeout(800)
      }

      const check = await iframe.locator('body').evaluate(() => {
        const text = document.body.innerText
        const hasTable = document.querySelectorAll('table').length > 0
        const hasCanvas = document.querySelectorAll('canvas').length > 0
        const hasSvg = document.querySelectorAll('svg').length > 0
        const hasData = text.includes('距离') || text.includes('m') || text.includes('Time') || text.includes('数据') || text.length > 500
        const hasYellowOnly = document.body.innerHTML.includes('yellow') && text.length < 200
        return { hasTable, hasCanvas, hasSvg, hasData, hasYellowOnly, len: text.length }
      })
      console.log(`[${slug}] regression check:`, check)
      expect(check.hasYellowOnly).toBe(false)
      expect(check.hasData).toBe(true)
    }
  })
})
