import express from 'express';
import bodyParser from 'body-parser';
import { boxRouter } from '../../src/routers/box-router';
import * as boxService from '../../src/services/box-service';
import request from 'supertest';

// Setup mock for boxService dependency
jest.mock('../../src/services/box-service');
const mockUserService = boxService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/box', boxRouter);

describe('GET /box/:userID', () => {
    test('Normal behavior Json with status 200', async () => {
        mockUserService.getBoxesByUserID.mockImplementation(async () => []);
        await request(app)
            .get('/box/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('No object found (404)', async() => {
        mockUserService.getBoxesByUserID
            .mockImplementation(async () => (0));

        await request(app)
            .get('/box/0')
            .expect(404);
    });
    test('500 internal server error', async() => {
        mockUserService.getBoxesByUserID
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/box/something')
            .expect(500)
    });
});
