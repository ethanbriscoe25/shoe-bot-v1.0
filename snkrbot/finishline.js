/*  finishlinejs
    version: 1.0.0
    Description: A bot using Node.js/puppeteer that buys limited edition shoes on release date through finishline
    Requirements: {
        puppeteer: 2.0.0
        puppeteer-extra: 3.1.7
        puppeteer-extra-plugin-stealth: 2.4.5
        simple-node-logger: 18.12.23
        fs: 0.0.1-security
    }
    Author: Ethan Briscoe
    License: GPL3
    Date: 12/29/21
*/

const puppeteer = require('puppeteer-extra')

// add a stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

//var realaddress = '41396 Rosaline Knoll'
var finishline = async function() {
    const browser = await puppeteer.launch({headless: false, slowMo: 2000});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36')
    await page.goto('https://www.finishline.com/store/men/shoes/running/_/store/product/mens-nike-air-huarache-casual-shoes/prod770377?styleId=DD1068&colorId=002')

    await page.waitFor(7000);
    await page.click("button[data-size='8.0']", btn => btn.click());
    await page.waitFor(2000);
    await page.click('#buttonAddToCart', btn => btn.click());

    await page.waitFor(3000);

    await page.$eval("a[class='button expanded mb-2 js-cart-proceed-btn']", elem => elem.click());

    //Shipping
    // *increase the speed of autofill for all input values, not select options

    await page.waitFor(2000);
    //await page.type("input[id='firstName'", 'Bob');
    await page.$eval('#firstName', el => el.value = 'Bob');
    await page.waitFor(100);
    //await page.type("input[id='shippingLastName'", 'Jones');
    await page.$eval('#shippingLastName', el => el.value = 'Jones');
    await page.waitFor(100);
    //await page.type("input[id='shippingAddress1'", realaddress);
    await page.$eval('#shippingAddress1', el => el.value = '41396 Rosaline Knoll');
    await page.waitFor(100);
    //await page.type("input[id='shippingCity'", 'realcity');
    await page.$eval('#shippingCity', el => el.value = 'Fideliahaven');
    await page.waitFor(100);
    await page.select('#shippingState', 'GA');
    await page.waitFor(100);
    //await page.type("input[id='shippingZip'", 'zipcode');
    await page.$eval('#shippingZip', el => el.value = '51032');
    await page.waitFor(100);
    //await page.type("input[id='shippingPhone'", 'phonenumber');
    await page.$eval('#shippingPhone', el => el.value = '7705690777');
    await page.waitFor(100);
    //await page.type("input[id='email'", 'emailaddress');
    await page.$eval('#email', el => el.value = 'bob123@gmail.com');

    await page.waitFor(3000);
    await page.click("button[type='submit']", btn => btn.click());

    await page.waitFor(5000);

    //await page.type('#billingCardNumber', '4532443738536086');
    await page.$eval('#billingCardNumber', el => el.value = '4532443738536086');
    await page.waitFor(100);
    await page.select('#billingExpirationMonth', '12');
    await page.waitFor(100);
    await page.select('#billingExpirationYear', '2026');
    await page.waitFor(100);
    //await page.type('#billingCardNumber', '139');
    await page.$eval('#billingSecurityCode', el => el.value = '139');
    await page.waitFor(100);
    try {
        await page.click('#billingContinueButton', btn => btn.click());
    } catch (ex){
        await page.click("button[id='billingContinueButton']", btn => btn.click());
    }


}();



