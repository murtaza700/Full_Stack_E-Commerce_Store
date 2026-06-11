import express from 'express';
import dotenv from 'dotenv';

import app from './src/app.js';
import db from './src/db/db.js';

const PORT = process.env.PORT || 5000;

dotenv.config();
db();


app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT} ✅`);
});