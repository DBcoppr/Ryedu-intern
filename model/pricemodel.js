import mongoose from "mongoose";
const schema = mongoose.Schema({
    country: {
        type: String,
        required: [true, "country detail required"]
    },
    city: {
        type: String,
        enum: ["Berlin", "London", "Paris", "Barcelona", "Amsterdam"],
        required: [true, "city detail required"]
    },
    vehicle_type: {
        type: String,
        required: [true, "vehicletype detail required"]
    },
    airpotfee:
    {
        type: Number,
        required: [true, "airpotfee required"]
    },
    amountPerhr: {
        type: Number,
        required: [true, "Amount per hr required"]
    },
    amountPerkm: {
        type: Number,
        required: [true, "Amount per km required"]
    },
    baseAmount: {
        type: Number,
        required: [true, "Base Amount required"]
    },
    baseKm: {
        type: Number,
        required: [true, "Base Km required"]
    }
})
export const pricemodel = mongoose.model("Pricing", schema)