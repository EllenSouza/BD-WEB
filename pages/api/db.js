// get the client
const mysql = require('mysql2/promise');
export default async function connection(req, res) {
    // create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ellen@2001',
        database: 'TrabBD',
    });
    try {
        const [results] = await connection.query('SELECT * FROM Complexo');
        res.status(200).json({ data: results });
    } catch (error) {}
}
