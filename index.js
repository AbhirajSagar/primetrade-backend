import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { ConnectDb } from './lib/MongooseConnection.js';
import V1Routes from './routes/v1/V1Routes.js';

const PORT = process.env.PORT || 3000
const FRONTED_CLIENT_URL = process.env.FRONTEND_CLIENT_URL || 'http://localhost:3001';

const app = express();
const db = await ConnectDb();

app.use(express.json())
app.use(cors({ origin: FRONTED_CLIENT_URL, credentials: true}))
app.use(cookieParser())
app.use('/v1', V1Routes);

app.listen(PORT, () => console.log(`Example app listening on http://localhost:${PORT}`));