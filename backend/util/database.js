import mysql from "mysql2";

const pool = mysql.createPool({
  host: "10.24.205.138",
  user: "jeongho",
  database: "post-project",
  password: "dlghwns308@",
});

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "user_test",
//   password: "po8610251.",
// });

export default pool.promise();
