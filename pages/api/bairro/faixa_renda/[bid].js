/**
 * Busca a quantidade de cada faixa de renda 
 * de um bairro específico
 */

import { executeQuery } from '../../../../lib/db';
export default async function bairro(req, res) {
    try {
        const { bid } = req.query;

        const faixaRendaPorBairro = await executeQuery(
            `
            SELECT
                Acima_Meio_SM,
                Baixa_Renda,
                Pobreza,
                (Extrema_Pobreza_sem_RC + Extrema_Pobreza_com_RC) as Extrema_Pobreza
            FROM Bairro
            WHERE Cod_Bairro=?
        `,
            [bid]
        );
        res.status(200).json({ data: faixaRendaPorBairro });
    } catch (error) {}
}
