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
        const bairro_ExPobreza = await executeQuery(`
            select nome_bairro, extrema_pobreza_sem_rc + extrema_pobreza_com_rc as total_extrema_pobreza
            from Bairro
            order by total_extrema_pobreza desc
            limit 15;
        `);

        res.status(200).json({
            Quantidade_de_favelas_por_bairro: fav_bairro,
            Quantidade_de_favelas_por_área_de_planejamento: fav_ap,
            Bairros_com_mais_extrema_pobreza: bairro_ExPobreza,
        });
    } catch (error) {}
}
