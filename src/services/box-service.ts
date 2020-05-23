import { Box } from '../models/Box';
import * as boxDao from '../daos/box-dao';

/**
 * getAllBoxes
 * This function sends the user ID to the dao function of the same name.
 * @param userID : number
 */
export function getAllBoxes(): Promise<Box[]> {
    return boxDao.getAllBoxes();
}

/**
 * getBoxesByUserID
 * This function sends the user ID to the dao function of the same name.
 * @param userID : number
 */
export function getBoxesByUserID(userID: number): Promise<Box[]> {
    return boxDao.getBoxesByUserID(userID);
}