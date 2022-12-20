// get the client
const mysql = require('mysql2/promise');
export default async function connection(req, res) {
    // create the connection to database
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });
    try {
        const [results] =
            await connection.query(`SELECT Nome_Bairro, COUNT(Cod_Fav) as Qtd_Favelas
        FROM Favela NATURAL RIGHT JOIN Bairro
        GROUP BY Cod_Bairro
        ORDER BY Qtd_Favelas DESC
        `);
        const [results2] =
            await connection.query(`SELECT Nome_AP, COUNT(cod_fav) as Qtd_Favelas
            FROM Bairro NATURAL JOIN Area_de_Planejamento NATURAL JOIN Favela
            GROUP BY Cod_AP;
        `);
        res.status(200).json({
            Quantidade_de_favelas_por_bairro: results,
            Quantidade_de_favelas_por_área_de_planejamento: results2,
        });
    } catch (error) {}
}
