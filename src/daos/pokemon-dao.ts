import { db } from '../daos/db';
import { User} from '../models/User';
import { Pokemon, PokemonRow } from '../models/Pokemon';

export function getPokemonInBoxForUser(userID: number, boxID: number): Promise<any[]> {
    const sql = 'SELECT pokemon.id, pokemon.name, species.name as "species" FROM project0.pokemon Right JOIN project0.species ON pokemon.species_id = species.id WHERE user_id = $1 AND box_id = $2';

    return db.query<PokemonRow>(sql, [userID, boxID]).then(result => result.rows.map(row => row));
}

export function depositPokemon(pokemon: Pokemon): Promise<Pokemon> {
    const sql = 'INSERT INTO project0.pokemon (name, species_id, box_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *';

    return db.query<PokemonRow>(sql, [pokemon.name, pokemon.speciesID, pokemon.boxID, pokemon.userID]).then(result => result.rows.map(row => Pokemon.from(row))[0]);
}

export function withdrawPokemon(uid: number, bid: number, pid: number):Promise<Pokemon> {
    const sql = 'DELETE FROM project0.pokemon WHERE user_id = $1 AND box_id = $2 AND id = $3 RETURNING *';

    return db.query<PokemonRow>(sql, [uid, bid, pid]).then(result => result.rows.map(row => Pokemon.from(row))[0]);
}