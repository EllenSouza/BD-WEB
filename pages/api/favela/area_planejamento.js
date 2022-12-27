/**
 * Busca a quantidade de favelas por área de planejamento
 */

import { executeQuery } from '../../../lib/db';
export default async function favelasAP(req, res) {
    try {
        const favelasAP = await executeQuery(`
            SELECT Nome_AP, COUNT(cod_fav) as Qtd_Favelas
            FROM Bairro NATURAL JOIN Area_de_Planejamento NATURAL JOIN Favela
            GROUP BY Cod_AP
        `);

        res.status(200).json({ data: favelasAP });
    } catch (error) {}
}
