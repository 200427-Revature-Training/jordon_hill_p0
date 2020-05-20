import { Pokemon } from '../models/Pokemon';
import * as pokemonDao from '../daos/pokemon-dao';

/**
 * getPokemonInBoxForUser
 * This function sends the userID and boxID to the dao function of the same name.
 * @param userID : number
 * @param boxID  : number
 */
export function getPokemonInBoxForUser(userID: number, boxID: number): Promise<Pokemon[]>  {
    return pokemonDao.getPokemonInBoxForUser(userID, boxID);
}

/**
 * depositPokemon
 * This function verifies data entered matches with a Pokemon object and sends it to the dao or rejects the data.
 * @param pokemon : any
 */
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

/**
 * withdrawPokemon
 * This function sends the userID, boxID, and pokemonID to the dao function of the same name.
 * @param uid : number userID
 * @param bid : number boxID
 * @param pid : number pokemonID
 */
export function withdrawPokemon(uid: number, bid: number, pid: number): Promise<Pokemon> {
    return pokemonDao.withdrawPokemon(uid, bid, pid);
}