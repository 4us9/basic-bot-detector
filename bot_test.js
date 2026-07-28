
const puppeteer = require('puppeteer')

;(async function testBot() {
  const url = 'http://127.0.0.1:8080'
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  // Log console messages from the page
  page.on('console', (message) => console.log(`${message.type().toUpperCase()} ${message.text()}`))
  await page.goto(url)
  await page.close()
  await browser.close()
})()

