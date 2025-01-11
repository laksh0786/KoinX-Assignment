import express from 'express';

//create a router instance
const router = express.Router();



//import the controller
import { getCryptoData, getCryptoDeviation } from '../controller/crypto.controller.js';



//create the routes
router.get('/stats', getCryptoData);
router.get('/deviation', getCryptoDeviation);



//export the router
export default router;