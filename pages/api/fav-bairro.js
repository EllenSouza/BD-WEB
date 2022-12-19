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
        res.status(200).json({ data: results });
    } catch (error) {}
}
