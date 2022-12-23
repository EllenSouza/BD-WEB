/**
 * Endpoint para trazer dados de um bairro específico
 */
import { executeQuery } from '../../../lib/db';
export default async function bairro(req, res) {
    try {
        const { bid } = req.query;

        const bairro = await executeQuery(
            `
            SELECT Cod_Bairro, Nome_Bairro
            FROM Bairro
            WHERE Cod_Bairro=?
        `,
            [bid]
        );
        res.status(200).json({ data: bairro });
    } catch (error) {}
}
