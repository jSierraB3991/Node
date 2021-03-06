import { createPool } from 'mysql2/promise'

export async function connect(){
    const conection = await createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'node_mysql_ts',
        connectionLimit: 10        
    });

    return conection;
}