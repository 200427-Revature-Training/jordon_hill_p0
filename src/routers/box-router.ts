import express from 'express';
import * as boxService from '../services/box-service';

export const boxRouter = express.Router();

// get all boxes
boxRouter.get('', (request, response, next) => {
    boxService.getAllBoxes().then(boxData => {
        if (!boxData) {
            response.sendStatus(404);
        } else {
            response.json(boxData);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

// get all boxes user has pokemon in
boxRouter.get('/:userID', (request, response, next) => {
    const userID = +request.params.userID;

    boxService.getBoxesByUserID(userID).then(boxData => {
        if (!boxData) {
            response.sendStatus(404);
        } else {
            response.json(boxData);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

