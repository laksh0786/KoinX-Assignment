import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
    name: { type: String, required: true},
    symbol: { type: String, required: true },
    price_usd: { type: Number, required: true },
    market_cap_usd: { type: Number, required: true },
    change_24h: { type: Number, required: true },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields


export default (mongoose.models.Crypto ||  mongoose.model('Crypto', cryptoSchema));