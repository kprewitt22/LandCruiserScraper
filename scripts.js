const puppeteer = require('puppeteer');

async function craigslistScrape(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://northmiss.craigslist.org');
    await page.type('input[type=text]', 'Land Cruiser');
    await page.keyboard.press('Enter');
    await page.waitForSelector('.cl-search-result');
    console.log('Results loaded');


    const results = await page.evaluate(()=> {
        const items = [];
        const listings = document.querySelectorAll('.cl-search-result')
        listings.forEach(listing => {
            const titleElement = listing.querySelector('.posting-title .label');
            console.log(titleElement)
            const priceElement = listing.querySelector('.priceinfo');
            console.log(priceElement)
            const locationElement = listing.querySelector('.meta');
            console.log(locationElement)
            const urlElement = listing.querySelector('a.posting-title');
            console.log(urlElement)
            items.push({
                title: titleElement ? titleElement.innerText : null,
                price: priceElement ? priceElement.innerText : null,
                location: locationElement ? locationElement.innerText.trim() : null,
                url: urlElement ? urlElement.href : null
            })
        })
        return items
    })
    console.log(results);
    await browser.close();
}
craigslistScrape();
