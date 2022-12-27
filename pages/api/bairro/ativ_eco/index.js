/**
 * Busca as atividades econômicas de cada bairros, até mesmo
 * para os bairros que não possuem atividades econômicas
 * registradas na base
 */

import { executeQuery } from '../../../../lib/db';
export default async function bairrosAtivEco(req, res) {
    try {
        const bairrosAtivEco = await executeQuery(`
            SELECT Nome_Bairro, Nome_Ativ, Quantidade_Empregos
            FROM Bairro_AtivEco NATURAL JOIN Atividade_Economica
                NATURAL RIGHT JOIN Bairro
            ORDER BY Quantidade_Empregos DESC;
        `);

        res.status(200).json({ data: bairrosAtivEco });
    } catch (error) {}
}
