import  express from 'express';
import connectDB from './config/db.js';
import  {scheduleJobs} from './backgorundScheduler.js';
import dotenv from "dotenv";

// Load environment variables
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start scheduled jobs - cron jobs
scheduleJobs();

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
