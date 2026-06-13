import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import app from './src/app.js';
import db from './src/db/db.js';

const PORT = process.env.PORT || 5000;

db();

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT} ✅`);
});