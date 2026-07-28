//The JS file to hold our bot detection logic

/**
 * Storing detected signals 
 */
function detectBot() {

    //using Navigator API. (Has info about the browser itself, like version, OS window is running, and capabilitites of that browser env)
    const detectors={

        //detecting WebDriver automations
        webDriver: navigator.webdriver //checks if browser is being controlled by Selenium, Puppeteer, or other automated testing frameworks.
    } 

}



