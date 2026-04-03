// Netlify Function: fetch current gasoline 95 price in Portugal
// Sources: GlobalPetrolPrices (scrape), fallback hardcoded
exports.handler = async () => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=86400', // cache 24h
  };

  try {
    // Source 1: GlobalPetrolPrices Portugal page
    const res = await fetch('https://www.globalpetrolprices.com/Portugal/gasoline_prices/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; travel-guide/1.0)' },
    });
    const html = await res.text();

    // Price is in a table cell, typically: "1.234" or "1.78" EUR per liter
    // Look for the pattern near "Portugal" and EUR price
    let price = null;

    // Pattern 1: price in <td> after "Gasoline prices" heading area
    const priceMatch = html.match(/class="graph_outside_link"[^>]*>[^<]*<\/a>\s*<\/td>\s*<td[^>]*>\s*([\d.]+)/);
    if (priceMatch) price = priceMatch[1];

    // Pattern 2: broader search for EUR price per liter
    if (!price) {
      const altMatch = html.match(/(\d\.\d{2,3})\s*(?:USD|EUR)\s*(?:per|\/)\s*liter/i);
      if (altMatch) price = altMatch[1];
    }

    // Pattern 3: look for price in any prominent data cell
    if (!price) {
      const cellMatch = html.match(/<td[^>]*class="[^"]*num[^"]*"[^>]*>\s*([\d.]+)\s*<\/td>/);
      if (cellMatch) price = cellMatch[1];
    }

    if (price && parseFloat(price) > 0.5 && parseFloat(price) < 5.0) {
      return { statusCode: 200, headers, body: JSON.stringify({ price, currency: 'EUR', source: 'globalpetrolprices.com', cached: false }) };
    }

    // Source 2: try FuelPricesEurope unofficial endpoint
    const res2 = await fetch('https://www.tolls.eu/fuel-prices/portugal');
    const html2 = await res2.text();
    const tollsMatch = html2.match(/Gasoline[^€]*€\s*([\d.,]+)/i) || html2.match(/([\d.]+)\s*€.*?(?:gasoline|petrol|gasolina)/i);
    if (tollsMatch) {
      const p = tollsMatch[1].replace(',', '.');
      if (parseFloat(p) > 0.5 && parseFloat(p) < 5.0) {
        return { statusCode: 200, headers, body: JSON.stringify({ price: p, currency: 'EUR', source: 'tolls.eu', cached: false }) };
      }
    }

    // Fallback
    return { statusCode: 200, headers, body: JSON.stringify({ price: '1.75', currency: 'EUR', source: 'fallback', cached: true }) };
  } catch (err) {
    return { statusCode: 200, headers, body: JSON.stringify({ price: '1.75', currency: 'EUR', source: 'fallback', error: err.message }) };
  }
};
