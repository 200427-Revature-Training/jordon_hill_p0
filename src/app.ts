import express from 'express';
import bodyParser from 'body-parser';
import { db } from './daos/db';
import { peopleRouter } from './routers/people-router';
import { pokemonRouter } from './routers/pokemon-router';
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
// app.use('/people', peopleRouter);
// app.use('/pokemon', pokemonRouter);
app.use('/user', userRouter);

process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

app.listen(port, () => {
    console.log(`Home app running at http://localhost:${port}`);
});