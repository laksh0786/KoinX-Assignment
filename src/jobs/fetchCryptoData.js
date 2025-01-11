import axios from 'axios';
import Crypto from '../models/crypto.js';
import {COINGECKO_API_URL} from "../config//config.js";

const COINS = ['bitcoin', 'matic-network', 'ethereum'];
const COINGECKO_API = COINGECKO_API_URL;

const fetchCryptoData = async () => {
    try {
        const response = await axios.get(COINGECKO_API, {
            params: {
                ids: COINS.join(','),
                vs_currencies: 'usd',
                include_market_cap: true,
                include_24hr_change: true,
            },
        });

        const data = response.data;

        console.log('Fetched crypto data:', data);

        for (const coin of COINS) {
            const crypto = {
                name: coin,
                symbol: coin === 'matic-network' ? 'MATIC' : coin.toUpperCase(),
                price_usd: data[coin].usd,
                market_cap_usd: data[coin].usd_market_cap,
                change_24h: data[coin].usd_24h_change,
            };

            // Upsert the data into the database
            //Upsert in mongoose is a combination of update and insert. If the document exists, it will be updated; otherwise, it will be inserted.
            await Crypto.findOneAndUpdate(
                { name: crypto.name }, // Find a document with the name
                crypto,  // Update the document with the new data
                { upsert: true, new: true } // Create a new document if it doesn't exist
            );
        }

        console.log('Crypto data updated successfully.');
    } catch (error) {
        console.error('Error fetching crypto data:', error.message);
    }
};

export default fetchCryptoData;
