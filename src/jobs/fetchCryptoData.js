import axios from 'axios';
import Crypto from '../models/crypto.js';
import { COINGECKO_API_URL } from '../config/config.js';

const COINS = ['bitcoin', 'matic-network', 'ethereum'];
const COINGECKO_API = COINGECKO_API_URL;

const fetchCryptoData = async () => {
  try {
    // Fetch data from CoinGecko API
    const response = await axios.get(COINGECKO_API, {
      params: {
        ids: COINS.join(','), // List of coins
        vs_currencies: 'usd', // Convert to USD
        include_market_cap: true, // Include market cap
        include_24hr_change: true, // Include 24-hour price change
      },
    });

    const data = response.data;

    console.log('Fetched crypto data:', data);

    // Iterate over the fetched coins and create new documents for each
    for (const coin of COINS) {
      const cryptoRecord = {
        name: coin,
        symbol: coin === 'matic-network' ? 'MATIC' : coin.toUpperCase(),
        price_usd: data[coin].usd,
        market_cap_usd: data[coin].usd_market_cap,
        change_24h: data[coin].usd_24h_change,
      };

      // Insert a new document for this record
      await Crypto.create(cryptoRecord);
    }

    console.log('Crypto data stored successfully.');
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
  }
};

export default fetchCryptoData;
