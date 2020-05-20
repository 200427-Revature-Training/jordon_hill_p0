import express from 'express';
import bodyParser from 'body-parser';
import { db } from './daos/db';
import { pokemonRouter } from './routers/pokemon-router';
import { boxRouter } from './routers/box-router';
import { userRouter } from './routers/user-router';

const app = express();

const port = process.env.port || 3000;
app.set('port', port);

/*
    ? Middleware Registration
*/
app.use(bodyParser.json());

/*
    ? Router Registration
*/
app.use('/user', userRouter);
app.use('/box', boxRouter);
app.use('/pokemon', pokemonRouter);

process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

app.listen(port, () => {
    console.log(`Home app running at http://localhost:${port}`);
});