import { db } from './db';
import { User, UserRow } from '../models/User';
import { Pokemon, PokemonRow } from '../models/Pokemon';

export function getUserByName(name: string): Promise<User> {
    const sql = 'SELECT * FROM project0.users WHERE name = $1';

    return db.query<UserRow>(sql, [name]).then(result => result.rows.map(row => User.from(row))[0]);
}

export function saveUser(user: User): Promise<User> {
    const sql = 'INSERT INTO project0.users (name) VALUES ($1) RETURNING *';

    return db.query<UserRow>(sql, [user.name]).then(result => result.rows.map(row => User.from(row))[0]);
}