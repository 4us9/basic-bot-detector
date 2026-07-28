# Basic Bot Detection 
Detecting bots on the client-side. This script will analyze bot data & how they interact with a webpage. 
- Looking at: interaction patterns, browser settings, or how a page's layout is displayed.

**Bot Signs This Project Detects**
- Use of automation tools
- User Agent containing `Headless`
- Missing languages
- Behavior of browser not the same as what User Agent indicates
- Check DOM element for automation markers

**Files**
- `index.html`: demo page
- `script.js`: detection logic
- `bot_test.js`: Puppeteer test script

**Run Locally**
```bash
npm install
# on http://127.0.0.1:8080
node bot_test.js
```

**Note**
- This is for learning/demo purposes. 
- Only a simple bot detection system