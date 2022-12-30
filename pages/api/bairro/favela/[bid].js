/**
 * Busca as favelas de um certo bairro
 */
import { executeQuery } from '../../../../lib/db';
export default async function bairroFavelas(req, res) {
    try {
        const { bid } = req.query;

        const favelas = await executeQuery(
            `
            SELECT Cod_Fav, Nome_Fav, Cod_Bairro, Nome_Bairro
            FROM Bairro NATURAL JOIN Favela
            WHERE Cod_Bairro=?
        `,
            [bid]
        );
        res.status(200).json({ data: favelas });
    } catch (error) {}
}
