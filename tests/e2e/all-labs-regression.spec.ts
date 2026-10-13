import { test, expect } from "@playwright/test"
import fs from "fs"
import path from "path"

const criticalSlugs = [
  "echo-sonar-lab",
  "electromagnet-lab",
  "density-explorer",
  "circuit-builder",
  "measurement-ruler",
  "resistance-factors-lab",
  "current-magnetic-effect-lab",
  "diffusion-lab",
  "states-of-matter-lab",
  "transformer-lab",
  "gas-pressure-lab",
  "electroscope-lab",
  "power-calculation-lab",
  "center-of-gravity-lab",
  "season-formation-lab",
  "moon-eclipse-tide-lab",
  "density-buoyancy-lab",
  "atomic-structure-lab",
  "water-electrolysis-lab",
  "friction-lab",
  "mechanical-energy-lab",
  "electromagnetic-induction-lab",
  "series-parallel-circuit-lab",
  "acid-base-ph-lab",
  "static-electricity-lab",
  "liquid-pressure-lab",
  "car-engine-lab",
  "transverse-longitudinal-waves-lab",
  "saturated-solution-lab",
  "force-three-elements-lab",
  "sound-three-elements-lab",
]

test.describe("Critical labs regression", () => {
  for (const slug of criticalSlugs) {
    test(`${slug} loads with canvas/svg and chart not empty`, async ({ page }) => {
      test.setTimeout(60000)
      await page.goto(`/laboratory/${slug}`, { waitUntil: "domcontentloaded" })
      await expect(page.getByText("Back to Laboratory").first()).toBeVisible({ timeout: 10000 })

      const iframe = page.frameLocator('iframe').first()
      // Wait for any visual element: canvas, svg, or .canvas-area
      const visual = iframe.locator('canvas, svg, .canvas-area, [class*="chart"]').first()
      await expect(visual).toBeVisible({ timeout: 15000 })

      await page.waitForTimeout(1000)

      const check = await iframe.locator('body').evaluate(() => {
        const text = document.body.innerText
        const canvases = document.querySelectorAll('canvas').length
        const svgs = document.querySelectorAll('svg').length
        const tables = document.querySelectorAll('table').length
        const hasData = text.length > 300
        const hasUndefined = text.toLowerCase().includes('summary1') && text.toLowerCase().includes('undefined')
        const hasYellowOnly = document.body.innerHTML.includes('yellow') && text.length < 200
        return { canvases, svgs, tables, hasData, hasUndefined, hasYellowOnly, len: text.length }
      })
      console.log(`[${slug}]`, check)
      expect(check.hasYellowOnly).toBe(false)
      expect(check.hasUndefined).toBe(false)
      expect(check.hasData).toBe(true)

      // Screenshot to public
      const dirs = [path.join(process.cwd(), "public/screenshots"), path.join(process.cwd(), "docs/screenshots")]
      for (const dir of dirs) {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        try {
          await page.screenshot({ path: path.join(dir, `${slug}.png`), fullPage: false })
        } catch {}
      }
    })
  }
})
