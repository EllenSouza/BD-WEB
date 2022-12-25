/**
 * Busca a quantidade de famílias em cada faixa de renda
 * por área de planejamento
 */

import { executeQuery } from '../../../../lib/db';
export default async function bairro(req, res) {
    try {
        const faixa_area_planejamento = await executeQuery(`
            SELECT
                Nome_AP,
                SUM(Acima_Meio_SM) as Acima_Meio_SM,
                SUM(Baixa_Renda) as Baixa_Renda,
                SUM(Pobreza) as Pobreza,
                SUM(Extrema_Pobreza_sem_RC + Extrema_Pobreza_com_RC) as Extrema_Pobreza
            FROM Bairro NATURAL JOIN Area_de_Planejamento
            GROUP BY Cod_AP
        `);
        res.status(200).json({ data: faixa_area_planejamento });
    } catch (error) {}
}
