/* istanbul ignore file */
import { db } from './db';
import { User, UserRow } from '../models/User';

/**
 * getUserByName
 * This function queries the database for the mathcing user name.
 * @param name : string
 */
export function getUserByName(name: string): Promise<User> {
    const sql = 'SELECT * FROM project0.users WHERE name = $1';

    return db.query<UserRow>(sql, [name]).then(result => result.rows.map(row => User.from(row))[0]);
}

/**
 * saveUser
 * This function inserts the user into the database.
 * @param user : User
 */
export function saveUser(user: User): Promise<User> {
    const sql = 'INSERT INTO project0.users (name) VALUES ($1) RETURNING *';

    return db.query<UserRow>(sql, [user.name]).then(result => result.rows.map(row => User.from(row))[0]);
}