import { Actor } from 'apify';
import { PlaywrightCrawler } from 'crawlee';

await Actor.init();

const input = await Actor.getInput();
const {
    category = 'cars-bikes',
    city = 'delhi',
    maxResults = 50,
    proxyConfiguration
} = input || {};

const startUrl = `https://www.locanto.in/${category}/${city}/`;
const results = [];

const crawler = new PlaywrightCrawler({
    proxyConfiguration: proxyConfiguration?.useApifyProxy 
        ? await Actor.createProxyConfiguration(proxyConfiguration)
        : undefined,
    
    launchContext: {
        launchOptions: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    },

    async requestHandler({ page, request }) {
        console.log(`Processing: ${request.url}`);
        
        // Wait for listings to load
        await page.waitForSelector('[class*="list"], [class*="ad"], [class*="item"]', {
            timeout: 15000
        }).catch(() => console.log('Timeout waiting for listings'));
        
        // Give JS time to render
        await page.waitForTimeout(3000);
        
        // Extract listings using page.evaluate
        const listings = await page.evaluate(({ maxResults }) => {
            const items = [];
            
            // Try multiple selector patterns (Locanto uses various class names)
            const selectors = [
                '[class*="adList"] a',
                '[class*="classified"] a',
                '[class*="listing"] a',
                '.list-item a',
                '[data-ad-id]'
            ];
            
            let links = [];
            for (const selector of selectors) {
                links = Array.from(document.querySelectorAll(selector));
                if (links.length > 0) {
                    console.log(`Found ${links.length} links with selector: ${selector}`);
                    break;
                }
            }
            
            // Extract data from each listing
            for (const link of links.slice(0, maxResults)) {
                const parent = link.closest('[class*="ad"], [class*="item"], [class*="list"]') || link;
                
                const title = link.textContent?.trim() || 
                             link.querySelector('[class*="title"]')?.textContent?.trim() ||
                             '';
                
                const price = parent.querySelector('[class*="price"]')?.textContent?.trim() || 'N/A';
                const location = parent.querySelector('[class*="location"], [class*="city"]')?.textContent?.trim() || '';
                const url = link.href || '';
                
                if (title && url && url.includes('locanto.in')) {
                    items.push({
                        title,
                        price,
                        location,
                        url,
                        scrapedAt: new Date().toISOString()
                    });
                }
            }
            
            return items;
        }, { maxResults });
        
        console.log(`Extracted ${listings.length} listings`);
        results.push(...listings);
    },

    maxRequestsPerCrawl: 10,
    maxConcurrency: 1
});

await crawler.run([startUrl]);

console.log(`Total results: ${results.length}`);

// Save to dataset
await Actor.pushData(results);

await Actor.exit();
