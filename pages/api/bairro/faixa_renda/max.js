/**
 * Busca os bairros com maiores índices de cada faixa
 * de renda
 */

import { executeQuery } from '../../../../lib/db';
export default async function bairro(req, res) {
    try {
        const queries = [
            `SELECT
                Nome_Bairro,
                Extrema_Pobreza_sem_RC + Extrema_Pobreza_com_RC as Extrema_Pobreza
            FROM Bairro
            WHERE Extrema_Pobreza_sem_RC + Extrema_Pobreza_com_RC  IN (
                SELECT
                    MAX(Extrema_Pobreza_sem_RC + Extrema_Pobreza_com_RC)
                FROM Bairro
            )`,
            `
            SELECT Nome_Bairro, Pobreza
            FROM Bairro
            WHERE Pobreza IN (SELECT MAX(Pobreza) FROM Bairro)
            `,
            `
            SELECT Nome_Bairro, Baixa_Renda
            FROM Bairro
            WHERE Baixa_Renda IN (SELECT MAX(Baixa_Renda) FROM Bairro)
            `,
            `
            SELECT Nome_Bairro, Acima_Meio_SM
            FROM Bairro
            WHERE Acima_Meio_SM IN (SELECT MAX(Acima_Meio_SM) FROM Bairro)
            `,
        ];

        const results = await executeQuery(queries);
        const response = results.map((resp) => {
            const [a] = resp;
            return a;
        });
        const dataReturn = {
            extrema_pobreza: response[0],
            pobreza: response[1],
            baixa_renda: response[2],
            acima_meio_sm: response[3],
        };
        res.status(200).json({ data: dataReturn });
    } catch (error) {}
}
