import { Box } from '../models/box';
import * as boxDao from '../daos/box-dao';

export function getBoxesByUserID(userID: number): Promise<Box[]> {
    return boxDao.getBoxesByUserID(userID);
}