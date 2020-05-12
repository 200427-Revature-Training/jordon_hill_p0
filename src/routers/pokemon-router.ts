import express from 'express';
import * as pokemonService from '../services/pokemon-service';
import * as userService from '../services/user-service';

export const pokemonRouter = express.Router();

/*
    http://localhost:3000/pokemon
    Retrieves an array of pokemon from database
*/
pokemonRouter.get('', (request, response, next) => {
    pokemonService.getAllPokemon().then(pokemon => {
        response.json(pokemon);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

/*
    http://localhost:3000/pokemon/1
    Retrieves a single pokemon from the database by id
    If the pokemon does not exist, sends 404
*/
pokemonRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    pokemonService.getPokemonById(id).then(pokemon => {
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

/*
    POST http://localhost:3000/pokemon
    Creates a new pokemon and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
pokemonRouter.post('', (request, response, next) => {
    const pokemon = request.body;
    pokemonService.savePokemon(pokemon)
        .then(newPokemon => {
            response.status(201);
            response.json(newPokemon);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
        });
});

/* PATCH is an HTTP method that serves as partial replacement */
pokemonRouter.patch('', (request, response, next) => {
    const pokemon = request.body;
    pokemonService.patchPokemon(pokemon)
        .then(updatedPokemon => {
            if(updatedPokemon) {
                response.json(updatedPokemon);
            } else {
                response.sendStatus(404);
            }
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
        }).finally(() => {
            next();
        })
});