const API_KEY = import.meta.env.VITE_DATA_GOV_API_KEY;
const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070'; // Current Daily Price of Various Commodities

/**
 * Fetches real-time mandi prices from Data.gov.in
 * @param {string} state - Filter by state (e.g., 'Maharashtra')
 * @returns {Promise<Object>} - Processed crop prices and nearby mandi data
 */
export const fetchMandiPrices = async (state = 'Maharashtra') => {
  if (!API_KEY) {
    throw new Error('API Key missing. Please add VITE_DATA_GOV_API_KEY to your .env file.');
  }

  const url = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&filters[state]=${state}&limit=100`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return processMandiData(data.records);
  } catch (error) {
    console.error('Error fetching mandi prices:', error);
    throw error;
  }
};

/**
 * Processes raw API records into the format required by the UI
 */
const processMandiData = (records) => {
  const cropPrices = {};
  const nearbyMandis = [];

  // 1. Process for Unique Crops (Aggregate average prices)
  const cropsMap = {};
  
  records.forEach(record => {
    const name = record.commodity;
    const price = parseInt(record.modal_price);
    const market = record.market;
    const city = record.district;

    if (!cropsMap[name]) {
      cropsMap[name] = { prices: [], records: [] };
    }
    cropsMap[name].prices.push(price);
    cropsMap[name].records.push(record);

    // 2. Process for Nearby Mandis (List individual market entries)
    if (nearbyMandis.length < 10) {
      nearbyMandis.push({
        name: `${market} APMC`,
        city: city,
        distance: '--', // API doesn't provide distance
        price: price,
        crop: name,
        timing: '6 AM - 2 PM', // Default
        isBestDeal: price > 2000 && price < 3000, // Dummy logic for deal
      });
    }
  });

  // Calculate averages and simulate trends for each crop
  Object.keys(cropsMap).forEach(cropName => {
    const prices = cropsMap[cropName].prices;
    const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    
    // Simulate trend data relative to avgPrice
    const weekData = simulateTrend(avgPrice);
    const yesterday = weekData[5];
    const min = Math.round(avgPrice * 0.9);
    const max = Math.round(avgPrice * 1.1);

    cropPrices[cropName] = {
      emoji: getCropEmoji(cropName),
      unit: 'quintal',
      current: avgPrice,
      yesterday: yesterday,
      weekData: weekData,
      min: min,
      max: max,
      color: '#2D6A4F'
    };
  });

  return { cropPrices, nearbyMandis };
};

/**
 * Simulates a 7-day trend based on the current price
 */
const simulateTrend = (currentPrice) => {
  const trend = [];
  for (let i = 0; i < 6; i++) {
    // Random variance between -3% and +3%
    const variance = 1 + (Math.random() * 0.06 - 0.03);
    trend.push(Math.round(currentPrice * variance));
  }
  trend.push(currentPrice); // Today is the actual current price
  return trend;
};

/**
 * Helper to get emoji for a commodity name
 */
const getCropEmoji = (name) => {
  const emojis = {
    'Rice': '🌾',
    'Wheat': '🌿',
    'Cotton': '☁️',
    'Soyabean': '🫘',
    'Onion': '🧅',
    'Potato': '🥔',
    'Tomato': '🍅',
    'Maize': '🌽',
    'Sugarcane': '🎋'
  };
  return emojis[name] || '🚜';
};
