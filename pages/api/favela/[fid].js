/**
 * Busca todas as favelas
 */

import { executeQuery } from '../../../lib/db';
export default async function favelas(req, res) {
    try {
        const { fid } = req.query;

        const favelas = await executeQuery(
            `
            SELECT *
            FROM Favela
            WHERE Cod_Fav=?
        `,
            [fid]
        );

        res.status(200).json({ data: favelas });
    } catch (error) {}
}
