import { db } from './db';
import { User, UserRow } from '../models/User';
import { Box, BoxRow } from '../models/Box';
import { Pokemon, PokemonRow } from '../models/Pokemon';

export function getUserByName(name: string): Promise<User> {
    const sql = 'SELECT * FROM project0.users WHERE name = $1';

    return db.query<UserRow>(sql, [name]).then(result => result.rows.map(row => User.from(row))[0]);
}

export async function getBoxesByUserID(userID: number): Promise<Box[]> {
    let sql = 'SELECT project0.boxes.id, project0.boxes.name AS "box_name", COUNT (project0.pokemon.user_id) AS "num_users_pokemon_in_box" \
        FROM project0.boxes RIGHT JOIN project0.pokemon ON project0.boxes.id = project0.pokemon.box_id \
        WHERE project0.pokemon.user_id = $1 GROUP BY boxes.id, "box_name" ORDER BY boxes.id';

    return db.query<BoxRow>(sql, [userID]).then(result => result.rows.map(row => Box.from(row)));
}

export function getPokemonInBoxForUser(userID: number, boxID: number): Promise<Pokemon[]> {
    const sql = 'SELECT pokemon.id, pokemon.name, species.name as "species" FROM project0.pokemon Right JOIN project0.species ON pokemon.species_id = species.id WHERE user_id = $1 AND box_id = $2';

    return db.query<PokemonRow>(sql, [userID, boxID]).then(result => result.rows.map(row => Pokemon.from(row)));
}

export function saveUser(user: User): Promise<User> {
    const sql = 'INSERT INTO project0.users (name) VALUES ($1) RETURNING *';

    return db.query<UserRow>(sql, [user.name]).then(result => result.rows.map(row => User.from(row))[0]);
}

export function depositPokemon(pokemon: Pokemon): Promise<Pokemon> {
    const sql = 'INSERT INTO project0.pokemon (name, species_id, box_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *';

    return db.query<PokemonRow>(sql, [pokemon.name, pokemon.species, pokemon.boxID, pokemon.userID]).then(result => result.rows.map(row => User.from(row))[0]);
}

export function withdrawPokemon(uid: number, bid: number, pid: number):Promise<Pokemon> {
    const sql = 'DELETE FROM project0.pokemon WHERE user_id = $1 AND box_id = $2 AND id = $3 RETURNING *';

    return db.query<PokemonRow>(sql, [uid, bid, pid]).then(result => result.rows.map(row => Pokemon.from(row)));
}