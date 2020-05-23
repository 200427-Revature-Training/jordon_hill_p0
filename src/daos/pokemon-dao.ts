/* istanbul ignore file */
import { db } from '../daos/db';
import { Pokemon, PokemonRow } from '../models/Pokemon';
import { Species, SpeciesRow } from '../models/Species';

/**
 * getPokemonInBoxForUser:
 * This function queries the database for all of a user's pokemon 
 * stored within the given box
 * @param userID : number
 * @param boxID : number
 */
export function getPokemonInBoxForUser(userID: number, boxID: number): Promise<any[]> {
    const sql = 'SELECT pokemon.id, pokemon.name, species.name as "species" FROM project0.pokemon \
        Right JOIN project0.species ON pokemon.species_id = species.id WHERE user_id = $1 AND box_id = $2 ORDER BY pokemon.id';

    return db.query<PokemonRow>(sql, [userID, boxID]).then(result => result.rows.map(row => row));
}

/**
 * getSpeciesList:
 * This function returns an array of all pokemon species in the database.
 */
export function getSpeciesList(): Promise<Species[]> {
    const sql = 'SELECT * FROM project0.species ORDER BY id';

    return db.query<SpeciesRow>(sql).then(result => result.rows.map(row => Species.from(row)));
}

/**
 * depositPokemon:
 * This fuction accepts a pokemon to be stored within the database.
 * @param pokemon : Pokemon
 */
export function depositPokemon(pokemon: Pokemon): Promise<Pokemon> {
    const sql = 'INSERT INTO project0.pokemon (name, species_id, box_id, user_id) VALUES \
        ($1, $2, $3, $4) RETURNING *';

    return db.query<PokemonRow>(sql, [pokemon.name, pokemon.speciesID, pokemon.boxID, pokemon.userID]).then(result => result.rows.map(row => Pokemon.from(row))[0]);
}

/**
 * withdrawPokemon:
 * This function accepts the userID, boxID, and pokemonID for a pokemon in the database, and removes it.
 * @param uid (userID) : number
 * @param bid (boxID) : number
 * @param pid (pokemonID) : number
 */
export function withdrawPokemon(uid: number, bid: number, pid: number):Promise<Pokemon> {
    const sql = 'DELETE FROM project0.pokemon WHERE user_id = $1 AND box_id = $2 AND id = $3 RETURNING *';

    return db.query<PokemonRow>(sql, [uid, bid, pid]).then(result => result.rows.map(row => Pokemon.from(row))[0]);
}