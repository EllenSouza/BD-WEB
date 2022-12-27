/**
 * Busca top 3 bairros com maior número de empregados.
 */

import { executeQuery } from '../../../../lib/db';

export default async function bairrosQtdEmpregados(req, res) {
    try {
        const bairrosQtdEmpregados = await executeQuery(`
            SELECT SUM(Quantidade_Empregos) as Qtd_Empregos, Nome_Bairro
            FROM Bairro_AtivEco NATURAL JOIN Bairro
            GROUP BY Cod_Bairro
            ORDER BY Qtd_Empregos DESC
            LIMIT 3
        `);
        res.status(200).json({ data: bairrosQtdEmpregados });
    } catch (error) {}
}
