const { chromium } = require('C:/Users/kathapong/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');

async function checkHover() {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173/');
    const avatar = page.locator('.avatar-art');
    await avatar.locator('img').evaluate(image => image.decode());
    const box = await avatar.boundingBox();
    const directions = [
      ['up', .5, .05],
      ['down', .5, .95],
      ['left', .05, .4],
      ['right', .95, .4],
    ];

    // ป้องกันเอฟเฟกต์ hover หมุนเฉพาะดวงตาโดยใบหน้าไม่หมุนตาม
    for (const [name, x, y] of directions) {
      await page.mouse.move(box.x + box.width * x, box.y + box.height * y);
      const transform = await avatar.locator('svg').evaluate(element => getComputedStyle(element).transform);
      assert.equal(transform, 'none', 'Eye overlay must stay aligned with the face');
      await page.waitForFunction(() => document.getAnimations().every(animation => animation.playState !== 'running'));
      await avatar.screenshot({ path: 'tests/screenshots/avatar-look-' + name + '.png' });
    }
    console.log('PASS: eyes stay aligned in all four directions.');
  } finally {
    await browser.close();
  }
}

checkHover().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
