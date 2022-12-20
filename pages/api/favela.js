import { executeQuery } from '../../lib/db';

export default async function connection(req, res) {
    try {
        const fav_bairro = await executeQuery(`
            SELECT Nome_Bairro, COUNT(Cod_Fav) as Qtd_Favelas
            FROM Favela NATURAL RIGHT JOIN Bairro
            GROUP BY Cod_Bairro
            ORDER BY Qtd_Favelas DESC
        `);

        const fav_ap = await executeQuery(`
            SELECT Nome_AP, COUNT(cod_fav) as Qtd_Favelas
            FROM Bairro NATURAL JOIN Area_de_Planejamento NATURAL JOIN Favela
            GROUP BY Cod_AP
        `);

        res.status(200).json({
            Quantidade_de_favelas_por_bairro: fav_bairro,
            Quantidade_de_favelas_por_área_de_planejamento: fav_ap,
        });
    } catch (error) {}
}
