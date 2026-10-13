import { test, expect } from "@playwright/test"

const experimentSlugs = [
  "measurement-ruler",
  "density-explorer",
  "reflection",
  "refraction",
  "circuit-builder",
  "lens-simulator",
  "ohms-law",
]

test.describe("Experiments — interaction, accuracy, no blocking", () => {
  for (const slug of experimentSlugs) {
    test(`${slug} loads, controls don't block, interacts without breaking`, async ({ page }) => {
      const consoleErrors: string[] = []
      page.on('console', msg => {
        if (msg.type() === 'error') {
          const txt = msg.text()
          if (!txt.includes('favicon') && !txt.includes('Failed to load resource') && !txt.includes('404')) {
            consoleErrors.push(txt)
          }
        }
      })
      page.on('pageerror', err => {
        if (!err.message.includes('favicon')) consoleErrors.push(err.message)
      })

      await page.goto(`/laboratory/${slug}`, { waitUntil: "domcontentloaded" })
      await expect(page.getByText("Back to Laboratory")).toBeVisible({ timeout: 10000 })

      // Wait for iframe
      const iframe = page.frameLocator('iframe').first()
      
      // Wait for canvas inside iframe with more time
      const canvas = iframe.locator('canvas').first()
      await expect(canvas).toBeVisible({ timeout: 15000 })
      
      // Wait a bit for resize observer to kick in
      await page.waitForTimeout(1500)

      // Check canvas has non-zero size inside iframe via evaluate
      const canvasSize = await iframe.locator('canvas').first().evaluate((c: HTMLCanvasElement) => {
        const rect = c.getBoundingClientRect()
        return { width: rect.width, height: rect.height, parentWidth: c.parentElement?.getBoundingClientRect().width, parentHeight: c.parentElement?.getBoundingClientRect().height }
      })
      console.log(`[${slug}] canvas size:`, canvasSize)
      expect(canvasSize.width).toBeGreaterThan(100)
      expect(canvasSize.height).toBeGreaterThan(100)

      // Check toolbar has no emoji
      const toolbarText = await iframe.locator('.toolbar').first().textContent()
      console.log(`[${slug}] toolbar:`, toolbarText?.slice(0,80))
      expect(toolbarText).not.toMatch(/[\u{1F300}-\u{1F9FF}]/u)

      // Check layout: side panel exists
      const sidePanel = iframe.locator('.side-panel').first()
      await expect(sidePanel).toBeVisible()

      // Check layout inside iframe: side panel should be on right side of main container, not overlapping center
      const layoutCheck = await iframe.locator('body').evaluate(() => {
        const main = document.querySelector('.main') as HTMLElement
        const canvasArea = document.querySelector('.canvas-area') as HTMLElement
        const sidePanel = document.querySelector('.side-panel') as HTMLElement
        if (!main || !canvasArea || !sidePanel) return { ok: false, reason: 'missing elements' }
        const mainRect = main.getBoundingClientRect()
        const canvasRect = canvasArea.getBoundingClientRect()
        const panelRect = sidePanel.getBoundingClientRect()
        // On desktop, main is row: canvas left, panel right
        const isRow = window.getComputedStyle(main).flexDirection === 'row'
        const canvasRight = canvasRect.right
        const panelLeft = panelRect.left
        // Check panel is to the right of canvas (or bottom on mobile) — allow small overlap tolerance
        const noOverlap = isRow ? (panelLeft >= canvasRight - 20) : (panelRect.top >= canvasRect.bottom - 20)
        const canvasHasWidth = canvasRect.width > 100
        const canvasHasHeight = canvasRect.height > 100
        const panelHasWidth = panelRect.width > 100
        // Check that old absolute controls don't exist
        const oldControls = document.querySelectorAll('.controls[style*="absolute"][style*="bottom:14px"]')
        return {
          ok: noOverlap && canvasHasWidth && canvasHasHeight && panelHasWidth,
          isRow,
          canvasRect: { x: canvasRect.x, y: canvasRect.y, w: canvasRect.width, h: canvasRect.height, right: canvasRect.right, bottom: canvasRect.bottom },
          panelRect: { x: panelRect.x, y: panelRect.y, w: panelRect.width, h: panelRect.height, left: panelRect.left, top: panelRect.top },
          noOverlap,
          canvasHasWidth,
          canvasHasHeight,
          panelHasWidth,
          oldControlsCount: oldControls.length,
          mainFlex: window.getComputedStyle(main).flexDirection
        }
      })
      console.log(`[${slug}] layout check:`, JSON.stringify(layoutCheck, null, 2))
      expect(layoutCheck.ok).toBe(true)
      expect(layoutCheck.oldControlsCount).toBe(0)

      // Interact with sliders if present
      const sliders = iframe.locator('input[type="range"]')
      const sliderCount = await sliders.count()
      console.log(`[${slug}] found ${sliderCount} sliders`)

      for (let i = 0; i < Math.min(sliderCount, 2); i++) {
        const slider = sliders.nth(i)
        await expect(slider).toBeVisible()
        const initial = await slider.inputValue().catch(() => "50")
        // Move slider
        await slider.evaluate((el: HTMLInputElement, val: string) => {
          el.value = val
          el.dispatchEvent(new Event('input', { bubbles: true }))
        }, '20')
        await page.waitForTimeout(400)
        await slider.evaluate((el: HTMLInputElement, val: string) => {
          el.value = val
          el.dispatchEvent(new Event('input', { bubbles: true }))
        }, '80')
        await page.waitForTimeout(400)
        // Restore
        await slider.evaluate((el: HTMLInputElement, val: string) => {
          el.value = val
          el.dispatchEvent(new Event('input', { bubbles: true }))
        }, initial)
        await page.waitForTimeout(400)
      }

      // Interact with selects
      const selects = iframe.locator('select')
      const selectCount = await selects.count()
      for (let i = 0; i < selectCount; i++) {
        const sel = selects.nth(i)
        const options = sel.locator('option')
        const optCount = await options.count()
        if (optCount > 1) {
          const secondValue = await options.nth(1).getAttribute('value')
          if (secondValue) {
            await sel.selectOption(secondValue)
            await page.waitForTimeout(500)
            const firstValue = await options.nth(0).getAttribute('value')
            if (firstValue) await sel.selectOption(firstValue)
            await page.waitForTimeout(500)
          }
        }
      }

      // Reset button — use JS click to avoid visibility issues with long toolbar titles
      const resetBtn = iframe.locator('button', { hasText: 'Reset' }).first()
      if (await resetBtn.count() > 0) {
        try {
          await resetBtn.evaluate((el: HTMLElement) => (el as any).click())
        } catch {
          // fallback
          await resetBtn.click({ force: true }).catch(() => {})
        }
        await page.waitForTimeout(600)
      }

      // Final check
      await expect(canvas).toBeVisible()
      const finalErrors = consoleErrors.filter(e => !e.includes('favicon'))
      if (finalErrors.length > 0) {
        console.log(`[${slug}] final console errors:`, finalErrors)
      }
      expect(finalErrors.length).toBe(0)

      await page.screenshot({ path: `docs/screenshots/experiment-${slug}-interaction.png`, fullPage: false })
      console.log(`✓ ${slug} passed`)
    })
  }

  test("side-panel layout not overlapping — density", async ({ page }) => {
    await page.goto("/laboratory/density-explorer", { waitUntil: "domcontentloaded" })
    const iframe = page.frameLocator('iframe').first()
    await iframe.locator('canvas').first().waitFor({ timeout: 15000 })
    await page.waitForTimeout(1000)

    const check = await iframe.locator('body').evaluate(() => {
      const sidePanel = document.querySelector('.side-panel') as HTMLElement
      const canvasArea = document.querySelector('.canvas-area') as HTMLElement
      const old = document.querySelectorAll('.controls')
      // Check old absolute style
      let oldAbsolute = 0
      document.querySelectorAll('.controls').forEach((el: any) => {
        const s = window.getComputedStyle(el)
        if (s.position === 'absolute' && s.bottom === '14px') oldAbsolute++
      })
      return {
        sidePanelVisible: !!sidePanel && window.getComputedStyle(sidePanel).display !== 'none',
        sidePanelWidth: sidePanel?.getBoundingClientRect().width,
        canvasWidth: canvasArea?.getBoundingClientRect().width,
        oldAbsolute,
        totalControls: old.length
      }
    })
    console.log("Side panel check:", check)
    expect(check.sidePanelVisible).toBe(true)
    expect(check.sidePanelWidth).toBeGreaterThan(200)
    expect(check.canvasWidth).toBeGreaterThan(200)
    expect(check.oldAbsolute).toBe(0)
  })
})
