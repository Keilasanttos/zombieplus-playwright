
const { Pool } = require('pg')

const DbConfig = {
    user: 'postgres.xrudwyliuuzgkbddsojp',
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    database: 'postgres',
    password: '9O9iYNGwJNEBObsI',
    port: 5432
}

export async function executeSQL(sqlScript) {
    try {
        const pool = new Pool(DbConfig)
        const client = await pool.connect()

        const result = await client.query(sqlScript)
        console.log(result.rows)

    } catch (error) {
        console.log('Erro ao executar SQL' + error)
    }






}