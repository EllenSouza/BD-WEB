import { pool } from '../../utils/config';
export default async function connection(req, res) {
    try {
        const connection = await pool.getConnection();

        const [results] = await connection.query('SELECT * FROM Complexo');

        pool.releaseConnection(connection);
        res.status(200).json({ data: results });
    } catch (error) {}
}
