import express from "express";
import path from "path";
const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, "public")));

/* app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send("Number of visit is" + visits);
    client.set("visits", parseInt(visits) + 1);
  });
}); */

/* app.get("/", (req, res) => {
  res.send({ message: "Hello WWW!" });
}); */

app.listen(4000, () => {
  console.log(`Listening on 4000`);
});
