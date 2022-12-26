/**
 * Busca todas as favelas
 */

import { executeQuery } from '../../../lib/db';
export default async function favelas(req, res) {
    try {
        const favelas = await executeQuery(`
            SELECT Cod_Fav, Nome_Fav
            FROM Favela
            ORDER BY Nome_Fav
        `);

        res.status(200).json({ data: favelas });
    } catch (error) {}
}
