/**
 * Busca todas a quantidade de favelas por quantidade de domicílios
 */

import { executeQuery } from '../../../lib/db';
export default async function favelasPop(req, res) {
    try {
        const favelasPop = await executeQuery(`
        SELECT Qtd_de_familias, SUM(Cod_Fav)as Qtd_Favelas FROM Favela GROUP BY Qtd_de_familias;
        `);

        res.status(200).json({ data: favelasPop });
    } catch (error) {}
}




