import { fastify } from "fastify";
import { DataBasePostgres } from "./dbPostgres.js";

const server = fastify();
const dataBase = new DataBasePostgres();

server.post("/videos", async (req, reply) => {
  const { title, description, duration } = req.body;

  await dataBase.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.get("/videos", async (req) => {
  const search = req.query.search;

  const videos = await dataBase.List(search);

  return videos;
});

server.put("/videos/:id", async (req, reply) => {
  const videoID = req.params.id;
  const { title, description, duration } = req.body;

  await dataBase.update(videoID, {
    title,
    description,
    duration,
  });
  return reply.status(204).send();
});

server.delete("/videos/:id", async (req, reply) => {
  const videoID = req.params.id;

  await dataBase.delete(videoID);
  return reply.status(204).send();
});

server.listen({
  port: process.env.PORT ?? 3337,
});
