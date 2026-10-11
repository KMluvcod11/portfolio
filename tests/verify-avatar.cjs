const { chromium } = require('C:/Users/kathapong/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');

async function verifyAvatar() {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173/');
    const avatar = page.locator('.avatar-art');
    await avatar.locator('img').evaluate(image => image.decode());

    // ตรวจทิศทางและขอบเขต เพื่อไม่ให้ดวงตาหลุดจากใบหน้า
    await page.mouse.move(0, 300);
    const left = await avatar.evaluate(element => parseFloat(element.style.getPropertyValue('--eye-x')));
    await page.mouse.move(1400, 300);
    const right = await avatar.evaluate(element => parseFloat(element.style.getPropertyValue('--eye-x')));
    assert(left < 0 && right > 0);
    assert(Math.abs(left) <= 22 && Math.abs(right) <= 22);
    await page.mouse.move(720, 450);
    await page.screenshot({ path: 'tests/screenshots/avatar-desktop-preview.png' });

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.mouse.move(1, 1);
    assert.equal(await avatar.evaluate(element => element.style.getPropertyValue('--eye-x')), '0px');
    await page.setViewportSize({ width: 390, height: 844 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: 'tests/screenshots/avatar-mobile-preview.png' });
    assert.deepEqual(errors, []);
    console.log('PASS: eye tracking, movement limits, reduced motion and mobile layout.');
  } finally {
    await browser.close();
  }
}

verifyAvatar().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
