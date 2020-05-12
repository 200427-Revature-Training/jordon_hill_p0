import { User } from '../models/User';
import * as userDao from '../daos/User-dao';

export function getUserByName(name: string) {
    return userDao.getUserByName(name);
}

export function saveUser(user: any): Promise<User> {

    console.log(user);
    // Data from the user cannot be trusted
    const newUser = new User(
        undefined, user.name
    );

    // IF we're going validate it here, we probably want
    // constraints on the db too

    if(getUserByName(user)) {
        // Data is valid - Continue submitting to DAO
        return userDao.saveUser(newUser);
    } else {
        // TODO: We should fail here, probably issue some kind of 400
        console.warn('User already exists');
        return new Promise((resolve, reject) => reject(422));
    }
}