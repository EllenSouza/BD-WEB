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
        const faixa_renda_AP = await executeQuery(`
            SELECT  Nome_AP,
            SUM(Acima_Meio_SM) as Total_Acima_Meio_SM,
            SUM(Baixa_Renda) as Total_Baixa_Renda,
            SUM(Pobreza) as Total_Pobreza,
            SUM(Extrema_Pobreza_sem_RC + Extrema_Pobreza_com_RC) as Total_Extrema_Pobreza
            FROM Bairro NATURAL JOIN Area_de_Planejamento
            GROUP BY Cod_AP;
        `);
        

        res.status(200).json({
            Quantidade_de_favelas_por_bairro: fav_bairro,
            Quantidade_de_favelas_por_área_de_planejamento: fav_ap,
            Bairros_com_mais_extrema_pobreza: bairro_ExPobreza,
            Faixa_renda_por_AP: faixa_renda_AP,
        });
    } catch (error) {}
}
