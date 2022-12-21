import { executeQuery } from '../../../lib/db';
export default async function bairro(req, res) {
    try {
        const { bid } = req.query;

        const ativEcoPorBairro = await executeQuery(
            `
            SELECT Nome_Ativ, Quantidade_Empregos
            FROM Bairro NATURAL JOIN Bairro_AtivEco NATURAL JOIN Atividade_Economica
            WHERE Cod_Bairro=?
            ORDER BY Nome_Ativ DESC
        `,
            [bid]
        );

        const faixaRendaPorBairro = await executeQuery(
            `
            SELECT
                Acima_Meio_SM,
                Baixa_Renda,
                (Extrema_Pobreza_sem_RC + Extrema_Pobreza_com_RC) as Extrema_Pobreza,
                Pobreza
            FROM Bairro
            WHERE Cod_Bairro=?
        `,
            [bid]
        );
        res.status(200).json({ data: [ativEcoPorBairro, faixaRendaPorBairro] });
    } catch (error) {}
}
