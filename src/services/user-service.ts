import { User } from '../models/User';
import { Box } from '../models/Box';
import { Pokemon } from '../models/Pokemon';
import * as userDao from '../daos/User-dao';

export function getUserByName(name: string): Promise<User> {
    return userDao.getUserByName(name);
}

export function getBoxesByUserID(userID: number): Promise<Box[]> {
    return userDao.getBoxesByUserID(userID);
}

export function getPokemonInBoxForUser(userID: number, boxID: number): Promise<Pokemon[]>  {
    return userDao.getPokemonInBoxForUser(userID, boxID);
}

export async function saveUser(user: any): Promise<User> {
    // Data from the user cannot be trusted
    const newUser = new User(
        undefined, user.name
    );
    // check if user exists
    const promise = await getUserByName(newUser.name);
    if(!promise) {
        // Data is valid - Continue submitting to DAO
        return userDao.saveUser(newUser);
    } else {
        console.warn('User already exists');
        return new Promise((resolve, reject) => reject(409));
    }
}

export function withdrawPokemon(uid: number, bid: number, pid: number):Promise<Pokemon> {
    return userDao.withdrawPokemon(uid, bid, pid);
}