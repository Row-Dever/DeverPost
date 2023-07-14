const express = require("express");
const app = express();
const port = 3000;
const database = require("./database");

const weather = {
  weather: "맑음",
  curr_temp: 24,
  highest_temp: 25,
  lowest_temp: 19,
};
app.get("/api/weather", (req, res) => {
  database.query("SELECT * FROM weather_data1", (err, data) => {
    if (!err) {
      res.send({ data });
    } else console.log(err);
  });
});

// app.get("/api/weather", (req, res) => {
//   res.send(weather);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
