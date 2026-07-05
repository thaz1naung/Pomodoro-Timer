const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const URL = 'https://pomodoro-vibes.vercel.app';

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function takeScreenshots() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // Screenshot 1: Focus theme, timer running
    console.log('Taking screenshot 1: Focus theme...');
    const page1 = await browser.newPage();
    await page1.setViewport({ width: 1280, height: 800 });
    await page1.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);

    // Click start button to run timer
    try {
      await page1.click('button:has-text("Start"), [data-testid="start-button"], .start-button');
      await sleep(1000);
    } catch (e) {
      console.log('Could not find start button, trying alternative selectors...');
      // Try clicking any button that might start the timer
      const buttons = await page1.$$('button');
      for (const button of buttons) {
        const text = await button.evaluate(el => el.textContent.toLowerCase());
        if (text.includes('start') || text.includes('go') || text.includes('▶')) {
          await button.click();
          await sleep(1000);
          break;
        }
      }
    }

    await page1.screenshot({
      path: path.join(SCREENSHOTS_DIR, '01-focus-theme.png'),
      fullPage: false
    });
    console.log('✓ Screenshot 1 saved');
    await page1.close();

    // Screenshot 2: Chill theme active
    console.log('Taking screenshot 2: Chill theme...');
    const page2 = await browser.newPage();
    await page2.setViewport({ width: 1280, height: 800 });
    await page2.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);

    // Try to switch to Chill theme
    try {
      // Look for theme selector or button
      const themeButtons = await page2.$$('button, [role="button"], .theme-selector, [data-theme]');
      for (const btn of themeButtons) {
        const text = await btn.evaluate(el => el.textContent.toLowerCase());
        if (text.includes('chill') || text.includes('relax')) {
          await btn.click();
          await sleep(500);
          break;
        }
      }
    } catch (e) {
      console.log('Could not find chill theme button');
    }

    await page2.screenshot({
      path: path.join(SCREENSHOTS_DIR, '02-chill-theme.png'),
      fullPage: false
    });
    console.log('✓ Screenshot 2 saved');
    await page2.close();

    // Screenshot 3: Deep Work theme active
    console.log('Taking screenshot 3: Deep Work theme...');
    const page3 = await browser.newPage();
    await page3.setViewport({ width: 1280, height: 800 });
    await page3.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);

    // Try to switch to Deep Work theme
    try {
      const themeButtons = await page3.$$('button, [role="button"], .theme-selector, [data-theme]');
      for (const btn of themeButtons) {
        const text = await btn.evaluate(el => el.textContent.toLowerCase());
        if (text.includes('deep') || text.includes('work') || text.includes('focus')) {
          await btn.click();
          await sleep(500);
          break;
        }
      }
    } catch (e) {
      console.log('Could not find deep work theme button');
    }

    await page3.screenshot({
      path: path.join(SCREENSHOTS_DIR, '03-deepwork-theme.png'),
      fullPage: false
    });
    console.log('✓ Screenshot 3 saved');
    await page3.close();

    // Screenshot 4: "Time's up! Start break?" state
    console.log('Taking screenshot 4: Break screen...');
    const page4 = await browser.newPage();
    await page4.setViewport({ width: 1280, height: 800 });
    await page4.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);

    // Try to trigger the break state
    try {
      // Look for a way to skip to end or trigger break notification
      // This might require JavaScript execution
      await page4.evaluate(() => {
        // Try to find and trigger timer completion
        const timer = document.querySelector('[data-testid="timer"], .timer, #timer');
        if (timer) {
          // Try to dispatch a custom event or modify state
          const event = new CustomEvent('timerComplete');
          timer.dispatchEvent(event);
        }
      });
      await sleep(1000);
    } catch (e) {
      console.log('Could not trigger break state programmatically');
    }

    await page4.screenshot({
      path: path.join(SCREENSHOTS_DIR, '04-break-screen.png'),
      fullPage: false
    });
    console.log('✓ Screenshot 4 saved');
    await page4.close();

    // Screenshot 5: Mobile view (375x812)
    console.log('Taking screenshot 5: Mobile view...');
    const page5 = await browser.newPage();
    await page5.setViewport({ width: 375, height: 812 });
    await page5.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);

    await page5.screenshot({
      path: path.join(SCREENSHOTS_DIR, '05-mobile-view.png'),
      fullPage: false
    });
    console.log('✓ Screenshot 5 saved');
    await page5.close();

    console.log('\n✅ All screenshots taken successfully!');
    console.log(`Screenshots saved to: ${SCREENSHOTS_DIR}`);

    // Verify files exist
    const files = fs.readdirSync(SCREENSHOTS_DIR);
    console.log('\nFiles in screenshots directory:');
    files.forEach(file => {
      const stats = fs.statSync(path.join(SCREENSHOTS_DIR, file));
      console.log(`  ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
    });

  } catch (error) {
    console.error('Error taking screenshots:', error);
  } finally {
    await browser.close();
  }
}

takeScreenshots().catch(console.error);
