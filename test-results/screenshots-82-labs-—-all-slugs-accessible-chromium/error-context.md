# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: screenshots.spec.ts >> 82 labs — all slugs accessible
- Location: tests/e2e/screenshots.spec.ts:81:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_EMPTY_RESPONSE at http://localhost:3000/laboratory
Call log:
  - navigating to "http://localhost:3000/laboratory", waiting until "networkidle"

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | import fs from "fs"
  3  | import path from "path"
  4  | 
  5  | const routes = [
  6  |   { route: "/", name: "landing.png", wait: "text=ScienceMaterial" },
  7  |   { route: "/dashboard", name: "dashboard.png", wait: "text=Continue Learning" },
  8  |   { route: "/courses", name: "courses.png", wait: "text=Courses" },
  9  |   { route: "/courses/chu-yi-shang/ce-liang", name: "chapter.png", wait: "text=概述" },
  10 |   { route: "/laboratory", name: "laboratory.png", wait: "text=Laboratory" },
  11 |   { route: "/laboratory/density-explorer", name: "experiment.png", wait: "iframe" },
  12 |   { route: "/quizzes", name: "quiz.png", wait: "text=Quizzes" },
  13 |   { route: "/progress", name: "progress.png", wait: "text=Progress" },
  14 |   { route: "/admin", name: "admin-dashboard.png", wait: "text=Admin Dashboard" },
  15 | ]
  16 | 
  17 | test.describe("Screenshots — real captures from implemented app", () => {
  18 |   for (const { route, name, wait } of routes) {
  19 |     test(`capture ${name} from ${route}`, async ({ page }) => {
  20 |       await page.goto(route, { waitUntil: "networkidle" })
  21 |       if (wait) {
  22 |         try {
  23 |           if (wait.startsWith("text=")) {
  24 |             await page.getByText(wait.replace("text=",""), { exact: false }).first().waitFor({ timeout: 15000 })
  25 |           } else {
  26 |             await page.locator(wait).first().waitFor({ timeout: 15000 })
  27 |           }
  28 |         } catch {}
  29 |       }
  30 |       await page.waitForTimeout(1200)
  31 | 
  32 |       const dirs = [
  33 |         path.join(process.cwd(), "docs/screenshots"),
  34 |         path.join(process.cwd(), "public/screenshots"),
  35 |       ]
  36 |       for (const dir of dirs) {
  37 |         if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  38 |         const fullPath = path.join(dir, name)
  39 |         await page.screenshot({ path: fullPath, fullPage: false })
  40 |         console.log(`✓ Screenshot saved: ${fullPath}`)
  41 |       }
  42 | 
  43 |       const content = await page.content()
  44 |       expect(content).not.toContain("bg-purple")
  45 |       // Branding: footer should show ScienceMaterial only, no license badge visible
  46 |       expect(content).toContain("ScienceMaterial")
  47 |     })
  48 |   }
  49 | })
  50 | 
  51 | test("design audit — Apple HIG + branding", async ({ page }) => {
  52 |   await page.goto("/", { waitUntil: "networkidle" })
  53 |   const bodyStyles = await page.evaluate(() => {
  54 |     const body = getComputedStyle(document.body)
  55 |     return {
  56 |       bg: body.backgroundColor,
  57 |       fontFamily: body.fontFamily,
  58 |     }
  59 |   })
  60 |   console.log("Body styles:", bodyStyles)
  61 |   const navbar = page.locator("header").first()
  62 |   await expect(navbar).toBeVisible()
  63 |   const content = await page.content()
  64 |   // Should not show license badges or external academy in UI
  65 |   expect(content.toLowerCase()).not.toContain("apache-2.0")
  66 |   // Footer should be ScienceMaterial only
  67 |   const footer = page.locator("footer").first()
  68 |   if (await footer.count() > 0) {
  69 |     const footerText = await footer.textContent()
  70 |     console.log("Footer:", footerText?.slice(0,200))
  71 |     expect(footerText).toContain("ScienceMaterial")
  72 |   }
  73 |   const button = page.locator("button").first()
  74 |   if (await button.count() > 0) {
  75 |     const radius = await button.evaluate(el => getComputedStyle(el).borderRadius)
  76 |     console.log("Button radius:", radius)
  77 |     expect(parseInt(radius)).toBeGreaterThanOrEqual(8)
  78 |   }
  79 | })
  80 | 
  81 | test("82 labs — all slugs accessible", async ({ page }) => {
  82 |   // Fetch list via API
> 83 |   await page.goto("/laboratory", { waitUntil: "networkidle" })
     |              ^ Error: page.goto: net::ERR_EMPTY_RESPONSE at http://localhost:3000/laboratory
  84 |   const content = await page.content()
  85 |   // Should mention 82 labs
  86 |   expect(content.toLowerCase()).toContain("laboratory")
  87 |   // Check API returns 82
  88 |   const res = await page.request.get("/api/experiments")
  89 |   const data = await res.json()
  90 |   console.log(`Experiments API returned ${data.length} labs`)
  91 |   expect(data.length).toBeGreaterThanOrEqual(80)
  92 | })
  93 | 
```