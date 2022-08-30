import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import apiRouters from './router/api';
import {mongoConnect} from './database/mongodb';

dotenv.config();

const app = express();

mongoConnect();

app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: true}));

app.use(apiRouters);

app.use((req: Request, res: Response) => {
    res.status(404).json({error:'Endpoint não encontrado.'});
})

app.listen(process.env.PORT);

