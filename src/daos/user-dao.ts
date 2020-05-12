import { db } from './db';
import { User, UserRow } from '../models/User';

export function getUserByName(name: string): Promise<boolean> {
    const sql = 'select name FROM users WHERE name = $1';

    return db.query<UserRow>(sql, name).then(result => result.rows.map(row => User.from(row))[0]);
}

export function saveUser(user: User): Promise<User> {
    const sql = `INSERT INTO users (name, last_name, birthdate) \
VALUES ($1, $2, $3) RETURNING *`;

    return db.query<UserRow>(sql, [
        user.name,
    ]).then(result => result.rows.map(row => User.from(row))[0]);
}