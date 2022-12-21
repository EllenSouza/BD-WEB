import { executeQuery } from '../../lib/db';
export default async function complexos(req, res) {
    try {
        const bairros = await executeQuery(`SELECT * FROM Complexo`);

        res.status(200).json({ data: bairros });
    } catch (error) {}
}
