import axios from "axios";
import { TryCatch } from "../utils/asyncCatch.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { COINGECKO_API_URL } from "../config/config.js";
import Crypto from "../models/Crypto.js";

const COINGECKO_API = COINGECKO_API_URL;

const getCryptoData = TryCatch(
    async (req, res, next) => {

        const { coin } = req.query;

        // Validate the coin query parameter
        if (!coin || !['bitcoin', 'ethereum', 'matic-network'].includes(coin)) {
            return next(new ErrorHandler('Invalid or missing coin parameter. Valid values: bitcoin, ethereum, matic-network', 422));
        }

        // Fetch data from CoinGecko API
        const { data } = await axios.get(COINGECKO_API, {
            params: {
                ids: coin,
                vs_currencies: 'usd', // Convert to USD
                include_market_cap: true, // Include market cap
                include_24hr_change: true, // Include 24-hour price change
            },
        });

        const cryptoData = data[coin];

        // console.log('Fetched crypto data:', cryptoData);

        if (!cryptoData) {
            return next(new ErrorHandler(`No data found for the requested coin: ${coin}`, 404));
        }

        // Respond with the required format
        res.status(200).json({
            price: cryptoData.usd,
            marketCap: cryptoData.usd_market_cap,
            ['24hChange']: cryptoData.usd_24h_change,
        });
    }
)


const getCryptoDeviation = async (req, res) => {

    const { coin } = req.query;

    // Validate the coin query parameter
    if (!coin || !['bitcoin', 'ethereum', 'matic-network'].includes(coin)) {
        return next(new ErrorHandler('Invalid or missing coin parameter. Valid values: bitcoin, ethereum, matic-network', 422));
    }

    // Fetch the latest 100 records for the given cryptocurrency
    const records = await Crypto.find({ name: coin })
        .sort({ updated_at: -1 }) // Get the most recent records
        .limit(100) // Limit to 100 records
        .select('price_usd'); // Only fetch the price field

    const prices = records.map((record) => record.price_usd);

    if (prices.length === 0) {
        return res.status(404).json({ error: `No data found for the requested coin: ${coin}` });
    }

    // Calculate mean
    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;

    // Calculate variance
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;

    // Calculate standard deviation
    const standardDeviation = Math.sqrt(variance);

    res.status(200).json({
        deviation: parseFloat(standardDeviation.toFixed(2)), // Round to 2 decimal places optionally - select the number of decimal places as required
    });
};

export { getCryptoData , getCryptoDeviation};