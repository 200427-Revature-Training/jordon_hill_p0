import express from 'express';
import * as userService from '../services/user-service';

export const userRouter = express.Router();

/* GET */

// Check if username exists, returns the user or "user does not exist"
userRouter.get('/:user', (request, response, next) => {
    const user = request.params.user;
    userService.getUserByName(user).then(user => {
        if (!user) {
            response.sendStatus(404);
        } else {
            if (user.password) user.password = "success";
            response.json(user);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

/* POST */

// add user to database
userRouter.post('', (request, response, next) => {
    const user = request.body;
    console.log(user);
    userService.saveUser(user)
        .then(newUser => {
            response.status(201);
            response.json(newUser);
            next();
        }).catch(err => {
            if (err === 409) {
                response.status(409);
                response.send("User already exists");
            } else {
                response.sendStatus(err);
            }
        });
});

// login
userRouter.post('/login', (request, response, next) => {
    userService.login(request.body)
        .then(user => {
            user.password = "success";
            response.status(200);
            response.json(user);
            next();
        }).catch(err => {
            response.sendStatus(err);
        });
});

// update user
userRouter.patch('/', (request, response, next) => {
    userService.updateUser(request.body).then(updatedUser => {
        if(updatedUser) {
            updatedUser.password = "success";
            response.json(updatedUser);
        } else {
            response.sendStatus(404);
        }
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    }).finally(() => {
        next();
    });
});