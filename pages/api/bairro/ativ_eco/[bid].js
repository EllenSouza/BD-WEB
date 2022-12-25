/**
 * Endpoint para trazer dados de um bairro específico
 */
import { executeQuery } from '../../../../lib/db';
export default async function bairro(req, res) {
    try {
        const { bid } = req.query;

        const ativEcoPorBairro = await executeQuery(
            `
            SELECT Nome_Ativ, Quantidade_Empregos
            FROM Bairro NATURAL JOIN Bairro_AtivEco NATURAL JOIN Atividade_Economica
            WHERE Cod_Bairro=?
            ORDER BY Quantidade_Empregos DESC
            LIMIT 15
        `,
            [bid]
        );

        res.status(200).json({ data: ativEcoPorBairro });
    } catch (error) {}
}
