/**
 * Endpoint que traz todos os bairros
 */

import { executeQuery } from '../../../lib/db';
export default async function bairros(req, res) {
    try {
        const bairros = await executeQuery(`
            SELECT Cod_Bairro, Nome_Bairro
            FROM Bairro
            ORDER BY Nome_Bairro
        `);

        res.status(200).json({ data: bairros });
    } catch (error) {}
}
