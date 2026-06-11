import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Api is Runing!'
    });
});

export default app;