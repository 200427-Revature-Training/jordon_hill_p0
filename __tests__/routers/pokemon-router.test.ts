import express from 'express';
import bodyParser from 'body-parser';
import { pokemonRouter } from '../../src/routers/pokemon-router';
import * as pokemonService from '../../src/services/pokemon-service';
import request from 'supertest';
import { depositPokemon, withdrawPokemon } from '../../src/daos/pokemon-dao';

// Setup mock for pokemonService dependency
jest.mock('../../src/services/pokemon-service');
const mockPokemonService = pokemonService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/pokemon', pokemonRouter);

describe('GET /pokemon/:userID/:boxID', () => {
    test('Normal behavior Json with status 200', async () => {
        mockPokemonService.getPokemonInBoxForUser.mockImplementation(async () => []);
        await request(app)
            .get('/pokemon/1/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('No object found (404)', async() => {
        mockPokemonService.getPokemonInBoxForUser.mockImplementation(async () => (0));

        await request(app)
            .get('/pokemon/1/0')
            .expect(404);
    });
    test('500 internal server error', async() => {
        mockPokemonService.getPokemonInBoxForUser.mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/pokemon/something/something')
            .expect(500)
    });
});

describe('POST /pokemon', () => {
    test('Successful creation should return 201 status', async () => {
        mockPokemonService.depositPokemon.mockImplementation(async () => ({}));
        const payload = {
            name: 'Piki',
            speciesID: 25,
            boxID: 4,
            userID: 2
        };

        await request(app)
            .post('/pokemon')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockPokemonService.depositPokemon.mockImplementation(async () => {throw new Error()});

        const payload = {
            name: 'Piki',
            speciesID: 25,
            boxID: 4,
            userID: 2
        };

        await request(app)
            .post('/pokemon')
            .send(payload)
            .expect(500);
    });
});

describe('DELETE /pokemon/:userID/:boxID/:pokemonID', () => {
    test('Normal behavior Json with status 204', async () => {
        mockPokemonService.withdrawPokemon.mockImplementation(async () => []);
        await request(app)
            .delete('/pokemon/1/1/1')
            .expect(204);
    });
    test('No object found (404)', async() => {
        mockPokemonService.withdrawPokemon.mockImplementation(async () => (0));

        await request(app)
            .delete('/pokemon/1/0/0')
            .expect(404);
    });
    test('500 internal server error', async() => {
        mockPokemonService.withdrawPokemon.mockImplementation(async () => {throw new Error()});

        await request(app)
            .delete('/pokemon/something/something/something')
            .expect(500)
    });
});
