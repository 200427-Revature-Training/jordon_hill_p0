import express from 'express';
import * as pokemonService from '../services/pokemon-service';

export const pokemonRouter = express.Router();

// get all pokemon the user has in the requested box
pokemonRouter.get('/:userID/:boxID', (request, response, next) => {
    const userID = +request.params.userID;
    const boxID = +request.params.boxID;

    pokemonService.getPokemonInBoxForUser(userID, boxID).then(pokemon => {
        if (!pokemon) {
            response.sendStatus(404);
        } else {
            response.json(pokemon);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

// get a list of all pokemon species
pokemonRouter.get('/species', (request, response, next) => {
    pokemonService.getSpeciesList().then(speciesList => {
        response.json(speciesList);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

// deposit pokemon
pokemonRouter.post('', (request, response, next) => {
    const pokemon = request.body;
    console.log(pokemon);
    pokemonService.depositPokemon(pokemon)
        .then(newPokemon => {
            response.status(201);
            response.json(newPokemon);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
        });
});

// withdraw pokemon
pokemonRouter.delete('/:userID/:boxID/:pokemonID', (request, response, next) => {
    const userID = +request.params.userID;
    const boxID = +request.params.boxID;
    const pokemonID = +request.params.pokemonID;
    pokemonService.withdrawPokemon(userID, boxID, pokemonID)
    .then(pokemon => {
        if (!pokemon) {
            response.sendStatus(404);
        } else {
            response.status(200);
            response.json(pokemon);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    })
});

