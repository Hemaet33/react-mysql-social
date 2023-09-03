import mysql from 'mysql';

const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const db = pool.getConnection((err, conn) => {
    if(err) console.log(err)
    console.log("Connected successfully")
})

