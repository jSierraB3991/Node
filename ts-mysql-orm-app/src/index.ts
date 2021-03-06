import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from "./routes/user.routes";
import { createConnection } from 'typeorm'
import "reflect-metadata";

const app = express();
createConnection();
//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use(userRoutes);



app.listen(3000, () => console.log('Server on Port 3000'));