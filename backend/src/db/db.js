import mongoose from "mongoose";

const db = async () => {

    const MONGO_URI = process.env.MONGO_URI;

    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected Successfully! ✅');
    } catch (err) {
        console.log(`MongoDB Error! `, err);
    }
}

export default db;