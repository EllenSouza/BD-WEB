/**
 * Busca todas as favelas
 */

import { executeQuery } from '../../../lib/db';
export default async function favelas(req, res) {
    try {
        const { fid } = req.query;

        const favelas = await executeQuery(
            `
            SELECT Nome_Fav,Nome_UPP, Qtd_de_familias, Grau_de_urbanizacao, Nome_Bairro, Nome_Comp
            FROM Favela
            NATURAL JOIN Bairro
            NATURAL JOIN Complexo
            WHERE Cod_Fav=?
        `,
            [fid]
        );

        res.status(200).json({ data: favelas });
    } catch (error) {}
}
