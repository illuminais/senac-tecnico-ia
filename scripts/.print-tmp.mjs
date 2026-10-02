import { chromium } from 'playwright'
const [,, porta, ...paginas] = process.argv
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
for (const p of paginas) {
  await page.goto(`http://localhost:${porta}/${p}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${process.env.S}/pag-${p}.png` })
}
await browser.close()
