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



