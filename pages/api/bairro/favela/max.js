/**
 * Busca o top 3 bairros com mais favelas
 */

import { executeQuery } from '../../../../lib/db';
export default async function bairrosComMaisFavelas(req, res) {
    try {
        const bairrosMaisFavelas = await executeQuery(`
            SELECT Quant_Favelas, Nome_Bairro
            FROM Bairro NATURAL JOIN (
                SELECT COUNT(Cod_Fav) Quant_Favelas, Cod_Bairro
                FROM Favela
                GROUP BY Cod_Bairro
                ORDER BY Quant_Favelas DESC
                LIMIT 3
            ) AS Bairro_Com_Mais_Favelas
        `);

        res.status(200).json({ data: bairrosMaisFavelas });
    } catch (error) {}
}
