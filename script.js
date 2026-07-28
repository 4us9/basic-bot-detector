//The JS file to hold our bot detection logic

/**
 * Storing detected signals 
 */
function detectBot() {

    //using Navigator API. (Has info about the browser itself, like version, OS window is running, and capabilitites of that browser env)
    const detectors={

        //detecting WebDriver automations
        webDriver: navigator.webdriver, //checks if browser is being controlled by Selenium, Puppeteer, or other automated testing frameworks.

        //Check User Agent
        //If the info contains "Headless" the app can treat this as suspicious
        headlessBrowser: navigator.userAgent.includes("Headless"),

        /*Note: the more indicators you analyze, the more accurate your bot detection can become. And the detection above can be maneuvered*/
        
        // Checks if no languages are set, uncommon for regular users
        noLanguages: (navigator.languages?.length || 0) === 0, 

    } 
}

/**
 * Verify that the info from User Agent behaves like it. JS environment for that User-Agent
 * should match. If Chrome, JS env and more should look like Chrome
 * 
 * @return boolean (true or false) if a browser is suspicious 
 */
function detectInconsistentEval() {

    //Different browsers format string differently.
    let length = eval.toString().length

    //Chrome always returns 33; FireFox 37
    let userAgent = navigator.userAgent.toLowerCase()
    let browser

    if (userAgent.indexOf('edg/') !== -1) {
        browser = 'edge'
    } else if (userAgent.indexOf('trident') !== -1 || userAgent.indexOf('msie') !== -1) {
    
        browser = 'internet_explorer'
    } else if (userAgent.indexOf('firefox') !== -1) {
        browser = 'firefox'

    } else if (userAgent.indexOf('opera') !== -1 || userAgent.indexOf('opr') !== -1) {
        browser = 'opera'
    } else if (userAgent.indexOf('chrome') !== -1) {
        browser = 'chrome'
    } else if (userAgent.indexOf('safari') !== -1) {
        browser = 'safari'
    } else {
        browser = 'unknown'
  }

  if (browser === 'unknown') return false

  return (
    (length === 33 && !['chrome', 'opera', 'edge'].includes(browser)) ||
    (length === 37 && !['firefox', 'safari'].includes(browser)) ||
    (length === 39 && !['internet_explorer'].includes(browser))
  )

}



