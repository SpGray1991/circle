import express from "express";
import redis from "ioredis";
import cors from "cors";

const app = express();
const client = new redis();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  console.log("ServerGet", await client.hgetall("coordinate2332"));

  res.json(await client.hgetall("coordinate2332"));

  /*  await client.get("pos3", function (err, reply) {}); */
});

app.post("/", (req, res) => {
  const map = req.body;
  /*   client.set("pos3", map.pos3);
  client.set("pos4", map.pos4); */
  client.hmset("coordinate2332", map);

  console.log("POST", map);
  res.json({ POST: true });
});

app.listen(5000, () => {
  console.log(`Listening on 5000`);
});
