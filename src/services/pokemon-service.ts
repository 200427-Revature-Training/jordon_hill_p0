import { Pokemon } from '../models/Pokemon';
import * as pokemonDao from '../daos/pokemon-dao';

export function getAllPokemon(): Promise<Pokemon[]> {
    // Apply internal business logic
    return pokemonDao.getAllPokemon();
}

export function getPokemonById(id: number): Promise<Pokemon> {
    // Apply internal business logic
    return pokemonDao.getPokemonById(id);
}

export function savePokemon(pokemon: any): Promise<Pokemon> {

    console.log(pokemon);
    // Data from the user cannot be trusted
    const newPokemon = new Pokemon(
        undefined, pokemon.name, pokemon.species,
        pokemon.boxID, pokemon.userID
    );

    // IF we're going validate it here, we probably want
    // constraints on the db too

    if(pokemon.name && pokemon.species && pokemon.boxID && pokemon.userID) {
        // Data is valid - Continue submitting to DAO
        return pokemonDao.savePokemon(newPokemon);
    } else {
        // TODO: We should fail here, probably issue some kind of 400
        console.warn('Pokemon invalid');
        return new Promise((resolve, reject) => reject(422));
    }
}
