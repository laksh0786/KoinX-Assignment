import express from 'express';

//create a router instance
const router = express.Router();



//import the controller
import { getCryptoData } from '../controller/crypto.controller.js';



//create the routes
router.get('/stats', getCryptoData)



//export the router
export default router;