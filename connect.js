import mysql from 'mysql';


export const db = mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:"password",
  database:process.env.DB_NAME,
  port:process.env.PORT
});


