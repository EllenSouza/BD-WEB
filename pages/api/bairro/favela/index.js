/**
 * Busca as favelas de cada bairro, inclusive os
 * bairros que não têm favelas
 */
import { executeQuery } from '../../../../lib/db';
export default async function bairroFavelas(req, res) {
    try {
        const bairrosFavelas = await executeQuery(`
            SELECT Cod_Bairro, Nome_Bairro, Cod_Fav, Nome_Fav
            FROM Bairro NATURAL LEFT JOIN Favela
        `);

        res.status(200).json({ data: bairrosFavelas });
    } catch (error) {}
}
