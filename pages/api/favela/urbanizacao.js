/**
 * Busca a quantidade de favelas em cada grau de urbanização
 */

import { executeQuery } from '../../../lib/db';
export default async function favelasUrb(req, res) {
    try {
        const favelasUrb = await executeQuery(`
        SELECT Grau_de_urbanizacao, SUM(Cod_Fav) as Qtd_Favelas FROM Favela GROUP BY Grau_de_urbanizacao;
        `);

        res.status(200).json({ data: favelasUrb });
    } catch (error) {}
}
