import { test } from "@playwright/test"

test("debug density", async ({ page }) => {
  page.on('console', msg => console.log('console', msg.type(), msg.text().slice(0,500)))
  page.on('pageerror', err => console.log('pageerror', err.message, err.stack?.slice(0,1000)))
  await page.goto("/laboratory/density-explorer", { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(5000)
  const iframeCount = await page.locator('iframe').count()
  console.log('iframe count', iframeCount)
  const src = await page.locator('iframe').first().getAttribute('src')
  console.log('src', src)
  // Try to get frame
  const frames = page.frames()
  console.log('frames', frames.map(f=>f.url()))
  for (const f of frames) {
    try {
      const body = await f.evaluate(() => {
        return {
          html: document.documentElement.innerHTML.slice(0,1000),
          canvas: document.querySelectorAll('canvas').length,
          bodyLen: document.body.innerHTML.length,
          errors: (window as any).errors || null
        }
      })
      console.log('frame', f.url(), JSON.stringify(body).slice(0,1000))
    } catch (e) {
      console.log('frame eval failed', f.url(), e)
    }
  }
  // Direct goto experiment file
  await page.goto("/experiments/density-explorer.html", { waitUntil: "domcontentloaded" })
  await page.waitForTimeout(5000)
  const canvasCount = await page.locator('canvas').count()
  console.log('direct canvas count', canvasCount)
  const bodyEval = await page.evaluate(() => {
    return {
      canvas: document.querySelectorAll('canvas').length,
      html: document.documentElement.innerHTML.slice(0,1000),
      body: document.body.innerHTML.slice(0,1000)
    }
  })
  console.log('direct eval', JSON.stringify(bodyEval).slice(0,2000))
})
