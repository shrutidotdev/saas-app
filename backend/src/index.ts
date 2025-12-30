import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from "express-rate-limit";
import morgan from 'morgan';
import {body, validationResult } from 'express-validator'; 
import { timeStamp } from 'node:console';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(helmet());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.get('/', (req, res ) => {
    res.json({ status : 'API is running', timeStamp: new Date().toISOString() });
})

app.use('/api/auth', auth)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})