import axios from "axios";
import { TryCatch } from "../utils/asyncCatch.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { COINGECKO_API_URL } from "../config/config.js";

const COINGECKO_API = COINGECKO_API_URL;

const getCryptoData = TryCatch(
    async (req, res, next) => {

        const { coin } = req.query;

        // Validate the coin query parameter
        if (!coin || !['bitcoin', 'ethereum', 'matic-network'].includes(coin)) {
            return next(new ErrorHandler('Invalid or missing coin parameter. Valid values: bitcoin, ethereum, matic-network', 422));
        }

        // Fetch data from CoinGecko API
        const {data} = await axios.get(COINGECKO_API, {
            params: {
                ids: coin,
                vs_currencies: 'usd', // Convert to USD
                include_market_cap: true, // Include market cap
                include_24hr_change: true, // Include 24-hour price change
            },
        });

        const cryptoData = data[coin];

        console.log('Fetched crypto data:', cryptoData);

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


export { getCryptoData };