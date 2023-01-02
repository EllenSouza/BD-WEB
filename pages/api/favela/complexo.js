/**
 * Busca as favelas de cada complexo e
 * as favelas que não pertencem a complexos.
 */
import { executeQuery } from '../../../lib/db';
export default async function complexos(req, res) {
    try {
        const favComplexos = await executeQuery(`
            SELECT Cod_Fav, Nome_Fav, Cod_Comp, Nome_Comp
            FROM Favela NATURAL LEFT JOIN Complexo
        `);

        res.status(200).json({ data: favComplexos });
    } catch (error) {}
}
