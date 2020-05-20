import { User } from '../models/User';
import { Box } from '../models/Box';
import { Pokemon } from '../models/Pokemon';
import * as userDao from '../daos/User-dao';

export function getUserByName(name: string): Promise<User> {
    return userDao.getUserByName(name);
}

export async function saveUser(user: any): Promise<User> {
    // Data from the user cannot be trusted
    const newUser = new User(
        undefined, user.name
    );
    // check if user exists
    if (!user.name) return new Promise((resolve, reject) => reject(422));
    const promise = await getUserByName(newUser.name);
    if(!promise) {
        // Data is valid - Continue submitting to DAO
        return userDao.saveUser(newUser);
    } else {
        console.warn('User already exists');
        return new Promise((resolve, reject) => reject(409));
    }
}