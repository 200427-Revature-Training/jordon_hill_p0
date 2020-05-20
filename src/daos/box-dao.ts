/* istanbul ignore file */
import { db } from '../daos/db';
import { Box, BoxRow } from '../models/Box';

/**
 * getBoxesByUserID:
 * This function accepts a userID and returns the boxs the user has pokemon stored in.
 * @param userID : number
 */
export async function getBoxesByUserID(userID: number): Promise<Box[]> {
    let sql = 'SELECT project0.boxes.id, project0.boxes.name AS "box_name", COUNT (project0.pokemon.user_id) AS "num_users_pokemon_in_box" \
        FROM project0.boxes RIGHT JOIN project0.pokemon ON project0.boxes.id = project0.pokemon.box_id \
        WHERE project0.pokemon.user_id = $1 GROUP BY boxes.id, "box_name" ORDER BY boxes.id';

    return db.query<BoxRow>(sql, [userID]).then(result => result.rows.map(row => Box.from(row)));
}