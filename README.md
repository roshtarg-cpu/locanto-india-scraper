# 🇮🇳 Locanto India Classifieds Scraper

[![Apify Actor](https://img.shields.io/badge/Apify-Actor-blue?logo=apify)](https://apify.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)](https://www.javascript.com/)
[![Playwright](https://img.shields.io/badge/Playwright-Enabled-green?logo=playwright)](https://playwright.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Extract classified listings from **Locanto India** (www.locanto.in) — cars, bikes, jobs, real estate, services, and more. Fast, reliable, and AI-agent ready.

---

## ✨ Features

- **Multi-Category Support** — Cars & Bikes, Jobs, Real Estate, Services, Community
- **City-Specific** — Scrape listings from Delhi, Mumbai, Bangalore, or any Indian city
- **Proxy Support** — Apify Proxy (residential/datacenter) included
- **Structured Data** — JSON output with title, price, location, URL
- **Fast & Reliable** — Playwright-powered for dynamic JavaScript content

---

## 📊 Output Example

```json
[
  {
    "title": "2020 Honda City - Excellent Condition",
    "price": "₹8,50,000",
    "location": "South Delhi, Delhi",
    "url": "https://www.locanto.in/ID_...",
    "scrapedAt": "2026-09-03T02:42:00.000Z"
  }
]
```

---

## 🚀 Quick Start

### Input Parameters

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `category` | String | `cars-bikes` | Category to scrape (cars-bikes, jobs, real-estate, services) |
| `city` | String | `delhi` | City name (delhi, mumbai, bangalore, etc.) |
| `maxResults` | Integer | `50` | Max listings to extract (1-500) |
| `proxyConfiguration` | Object | `{}` | Apify Proxy settings (optional) |

### Example Input

```json
{
  "category": "cars-bikes",
  "city": "mumbai",
  "maxResults": 100,
  "proxyConfiguration": {
    "useApifyProxy": true,
    "apifyProxyGroups": ["RESIDENTIAL"]
  }
}
```

---

## 🔧 Use Cases

- **Market Research** — Analyze pricing trends for cars, bikes, and real estate
- **Lead Generation** — Find job postings or service providers
- **Price Monitoring** — Track classified ads over time
- **Data Analysis** — Build datasets for ML models

---

## 📝 Notes

- Respects `robots.txt` and scrapes publicly available data
- Rate-limited to avoid server overload
- Proxy recommended for large-scale scraping

---

## 🛠 Built With

- [Apify SDK](https://sdk.apify.com) — Actor runtime
- [Crawlee](https://crawlee.dev) — Web scraping framework
- [Playwright](https://playwright.dev) — Browser automation

---

## 📄 License

MIT © 2026

---

## 🤖 AI Agent Integration

Compatible with Claude, ChatGPT & AI agents via Apify MCP.

Run this actor programmatically:

```javascript
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: 'YOUR_APIFY_TOKEN' });
const run = await client.actor('YOUR_USERNAME/locanto-india-scraper').call({
  category: 'jobs',
  city: 'bangalore',
  maxResults: 200
});

const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(items);
```

---

**Questions?** Open an issue on GitHub or contact [@roshtarg-cpu](https://github.com/roshtarg-cpu)
