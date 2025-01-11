import  express from 'express';
import connectDB from './config/db.js';
import  {scheduleJobs} from './backgorundScheduler.js';
import dotenv from "dotenv";
import { errorMiddleware } from './middlewares/error.js';

// Load environment variables
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();


//middlewares
app.use(express.json());





// Error handling middleware
app.use(errorMiddleware);



// Start scheduled jobs - cron jobs
scheduleJobs();

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
