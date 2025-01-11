import cron from 'node-cron';
import fetchCryptoData from './jobs/fetchCryptoData.js';
import { CRON_SCHEDULE } from './config/config.js';

const scheduleJobs = () => {

    // Run the initial job immediately- optional I am running just to get the data immediately
    (async () => {
        console.log('Running initial job: Fetch Crypto Data');
        await fetchCryptoData();
    })();

    // Schedule the job to run after every 2 hours
    cron.schedule(CRON_SCHEDULE, async () => {
        console.log('Running background job: Fetch Crypto Data');
        await fetchCryptoData();
    });
};


export {scheduleJobs}
