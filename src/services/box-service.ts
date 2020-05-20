import { Box } from '../models/box';
import * as boxDao from '../daos/box-dao';

/**
 * getBoxesByUserID
 * This function sends the user ID to the dao function of the same name.
 * @param userID : number
 */
export function getBoxesByUserID(userID: number): Promise<Box[]> {
    return boxDao.getBoxesByUserID(userID);
}