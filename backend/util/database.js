import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "post-project",
  password: "dlghwns308@",
});

export default pool.promise();
