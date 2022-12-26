/**
 * Busca a quantidade de favelas por bairro
 */

import { executeQuery } from '../../../lib/db';
export default async function favelasBairro(req, res) {
    try {
        const favelasBairro = await executeQuery(`
            SELECT Nome_Bairro, COUNT(Cod_Fav) as Qtd_Favelas
            FROM Favela NATURAL RIGHT JOIN Bairro
            GROUP BY Cod_Bairro
            ORDER BY Qtd_Favelas DESC
            LIMIT 30
        `);

        res.status(200).json({ data: favelasBairro });
    } catch (error) {}
}
