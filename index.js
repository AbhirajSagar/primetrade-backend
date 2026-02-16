import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { ConnectDb } from './lib/MongooseConnection.js';
import V1Routes from './routes/v1/V1Routes.js';

const PORT = process.env.PORT || 3000
const app = express();

await ConnectDb();
app.use(express.json())
app.use('/v1', V1Routes);

app.listen(PORT, () => console.log(`Example app listening on http://localhost:${PORT}`));