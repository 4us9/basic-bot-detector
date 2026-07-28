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
        
        // Check for inconsistent eval lengths
        inconsistentEval: detectInconsistentEval(), 


        // Checks whether the <html> element contains attributes
        // commonly injected by browser automation frameworks. It is there to help automation
        //stay on track. Modern automation remove them now.
        domManipulation: document.documentElement
            .getAttributeNames()
            .some((attr) => ['selenium', 'webdriver', 'driver'].includes(attr)),

    }
    
    //After gathering data points about the visitor's env, we now analyze the info
    //Stores the detection results and the final verdict
    const detections = {};
    let verdict = { bot: false };

    // Iterates over the detectors and sets the verdict to true if any of them detects bot-like activity
    for (const detectorName in detectors) {
        const detectorResult = detectors[detectorName];
        detections[detectorName] = { bot: detectorResult };
        
        //Very SIMPLE program: if any is true, we conclude it is a bot. Very safe.
        if (detectorResult) {
            verdict = { bot: true }; // Sets the verdict to true at the first detection of bot-like activity
        }

    }

    // which specific checks were triggered, not just the overall answer.
    return { detections, verdict };
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

const { detections, verdict } = detectBot();

document.getElementById('result').innerText = verdict.bot ? 'Bot detected' : 'No bot detected'; // Displays the detection result on the web page

console.log(JSON.stringify(verdict, null, 2)); // Logs the final verdict, "2" just indents two spaces for clarity
console.log(JSON.stringify(detections, null, 2)); // Logs detailed detections


