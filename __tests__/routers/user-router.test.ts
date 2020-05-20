import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from '../../src/routers/user-router';
import * as userService from '../../src/services/user-service';
import request from 'supertest';

// Setup mock for userService dependency
jest.mock('../../src/services/user-service');
const mockUserService = userService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/user', userRouter);

describe('GET /user/:user', () => {
    test('Normal behavior Json with status 200', async () => {
        mockUserService.getUserByName.mockImplementation(async () => []);
        await request(app)
            .get('/user/Hallstead')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('No object found (404)', async() => {
        mockUserService.getUserByName
            .mockImplementation(async () => (0));

        await request(app)
            .get('/user/404')
            .expect(404);
    });
    test('500 internal server error', async() => {
        mockUserService.getUserByName
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/user/John')
            .expect(500)
    });
});

describe('POST /user', () => {
    test('Successful creation should return 201 status', async () => {
        mockUserService.saveUser.mockImplementation(async () => ({}));
        const payload = {
            name: "Hallstead"
        };

        await request(app)
            .post('/user')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });
/*
    test('Should return 409 when encountering an error', async () => {
        mockUserService.saveUser.mockImplementation(async () => {throw new Error()});

        const payload = {
            name: "Hallstead"
        };

        await request(app)
            .post('/user')
            .send(payload)
            .expect(409);
    });
*/
});