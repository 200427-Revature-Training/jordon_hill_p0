import { db } from '../daos/db';
import { Pokemon, PokemonRow } from '../models/Pokemon';

/**
 * If we are using a one-off query for, we can just use db.query - it will have a connection
 * issue the query without having to pull it from the pool.
 *
 * query(sql, [params, ...]);
 */

export function getAllPokemon(): Promise<Pokemon[]> {
    const sql = 'SELECT * FROM project0.pokemon';

    // 1. Query database using sql statement above
    // 2. Query will return a promise typed as QueryResult<PokemonRow>
    // 3. We can react to the database response by chaining a .then onto the query
    return db.query<PokemonRow>(sql, []).then(result => {
        // 4. Extract rows from the query response
        const rows: PokemonRow[] = result.rows;

        console.log(rows);

        // 5. Convert row data format to Pokemon objects
        const pokemon: Pokemon[] = rows.map(row => Pokemon.from(row));
        return pokemon;
    });
}

export function getPokemonById(id: number): Promise<Pokemon> {
    // DO NOT ACTUALLY DO THIS
    // const sql = 'SELECT * FROM pokemon WHERE id = ' + id;

    // Use parameterized queries to avoid SQL Injection
    // $1 -> Parameter 1 placeholder
    const sql = 'SELECT * FROM project0.pokemon WHERE id = $1';

    return db.query<PokemonRow>(sql, [id])
        .then(result => result.rows.map(r => Pokemon.from(r))[0]);
}

export function savePokemon(pokemon: Pokemon): Promise<Pokemon> {
    const sql = `INSERT INTO project0.pokemon (name, species, box_id, user_id) \
VALUES ($1, $2, $3, $4) RETURNING *`;

const params = [pokemon.name, pokemon.species,
    pokemon.boxID, pokemon.userID];

    return db.query<PokemonRow>(sql, params)
        .then(result => result.rows.map(r => Pokemon.from(r))[0]);

}

export function patchPokemon(pokemon: Pokemon): Promise<Pokemon> {
    const sql = `UPDATE project0.pokemon SET name = COALESCE($1, name), \
species = COALESCE($2, species), box_id = COALESCE($3, box_id), \
user_id = COALESCE($4, user_id WHERE id = $5 RETURNING *`;

    const params = [pokemon.name, pokemon.species,
                    pokemon.boxID, pokemon.userID, pokemon.id];

    return db.query<PokemonRow>(sql, params)
        .then(result => result.rows.map(row => Pokemon.from(row))[0]);
}