import { User } from '../models/User';
import * as userDao from '../daos/User-dao';
import { resolve } from 'dns';

export async function getUserByName(name: string): Promise<User> {
    return userDao.getUserByName(name);
}

export async function saveUser(user: any): Promise<User> {
    // Data from the user cannot be trusted
    const newUser = new User(
        undefined, user.name
    );
    //check if user exists
    const promise = await getUserByName(newUser.name);
    if(!promise) {
        // Data is valid - Continue submitting to DAO
        return userDao.saveUser(newUser);
    } else {
        // TODO: We should fail here, probably issue some kind of 400
        console.warn('User already exists');
        return new Promise((resolve, reject) => reject(409));
    }
}