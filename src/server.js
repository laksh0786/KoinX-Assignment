import  express from 'express';
import connectDB from './config/db.js';
import  {scheduleJobs} from './backgorundScheduler.js';
import dotenv from "dotenv";
import { errorMiddleware } from './middlewares/error.js';


//import routes
import cryptoRoutes from './routes/crypto.routes.js';

// Load environment variables
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();


//middlewares
app.use(express.json());


//intitial route
app.get("/", (req, res) => {
    res.send("KoinX backend assignment is running...");
});

//mount the routes
app.use(cryptoRoutes);


// Error handling middleware
app.use(errorMiddleware);



// Start scheduled jobs - cron jobs
scheduleJobs();

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
