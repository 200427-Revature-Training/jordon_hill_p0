import { Pokemon } from '../models/Pokemon';
import * as pokemonDao from '../daos/pokemon-dao';

export function getPokemonInBoxForUser(userID: number, boxID: number): Promise<Pokemon[]>  {
    return pokemonDao.getPokemonInBoxForUser(userID, boxID);
}

export function depositPokemon(pokemon: any): Promise<Pokemon> {
    const newPokemon = new Pokemon(
        undefined, pokemon.name, pokemon.speciesID, pokemon.boxID, pokemon.userID
    );
    if (newPokemon.name && pokemon.speciesID && pokemon.boxID && pokemon.userID) {
        return pokemonDao.depositPokemon(newPokemon);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function withdrawPokemon(uid: number, bid: number, pid: number): Promise<Pokemon> {
    return pokemonDao.withdrawPokemon(uid, bid, pid);
}