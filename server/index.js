import express from "express";
import redis from "ioredis";
import cors from "cors";

const app = express();
const client = new redis();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.json(await client.hgetall("coords"));
});

app.post("/", async (req, res) => {
  const coords = req.body;

  await client.hmset("coords", coords);

  res.json({ POST: true });
});

app.listen(5000, () => {
  console.log(`Listening on 5000`);
});
