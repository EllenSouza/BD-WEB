import mysql from 'mysql2/promise';

export async function executeQuery(queries, values = []) {
    const dbconnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });
    try {
        let results;
        if (Array.isArray(queries)) {
            results = await Promise.all(
                queries.map(async (query) => {
                    const [r] = await dbconnection.execute(query, values);
                    return r;
                })
            );
        } else {
            [results] = await dbconnection.execute(queries, values);
        }
        dbconnection.end();
        return results;
    } catch (error) {
        throw Error(error.message);
    }
}
