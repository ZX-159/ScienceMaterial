import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const slugs = fs.readdirSync('public/experiments').filter(f=>f.endsWith('.html')).map(f=>f.replace('.html','')).sort();
console.log(`Found ${slugs.length} experiments`);

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();

fs.mkdirSync('public/screenshots', { recursive: true });

for (const slug of slugs) {
  const url = `http://localhost:3000/experiments/${slug}.html`;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(1500);
    // wait for canvas
    const canvasCount = await page.locator('canvas').count();
    console.log(`${slug}: canvas ${canvasCount}`);
    const out = path.join('public/screenshots', `${slug}.png`);
    await page.screenshot({ path: out, fullPage: false });
    console.log(`✓ ${slug} -> ${out}`);
  } catch (e) {
    console.log(`✗ ${slug} failed: ${e.message}`);
  }
}

// Also capture main pages
const mainPages = [
  { slug: 'landing', url: 'http://localhost:3000/' },
  { slug: 'courses', url: 'http://localhost:3000/courses' },
  { slug: 'laboratory', url: 'http://localhost:3000/laboratory' },
  { slug: 'dashboard', url: 'http://localhost:3000/dashboard' },
  { slug: 'admin-dashboard', url: 'http://localhost:3000/admin' },
];
for (const p of mainPages) {
  try {
    await page.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(2000);
    const out = path.join('public/screenshots', `${p.slug}.png`);
    await page.screenshot({ path: out, fullPage: false });
    console.log(`✓ ${p.slug}`);
  } catch (e) {
    console.log(`✗ ${p.slug} failed: ${e.message}`);
  }
}

await browser.close();
console.log('Done');
