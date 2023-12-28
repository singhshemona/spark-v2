import http from "http";
import { Client } from "@notionhq/client";
require("dotenv").config();

const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

if (!notionDatabaseId || !notionSecret) {
  throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}

const notion = new Client({
  auth: notionSecret,
});

const host = "localhost";
const port = 8000;

const getRandomIndex = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const server = http.createServer(async (req, res) => {
  // Avoid CORS errors
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  switch (req.url) {
    // respond to querying domain root (like http://localhost/)
    case "/":
      const database = await notion.databases.query({
        database_id: notionDatabaseId,
      });

      const randomIndex = getRandomIndex(0, database.results.length);

      console.log(database.results[randomIndex])

      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify(database.results[randomIndex]));
      break;

    // support only the / route
    default:
      res.setHeader("Content-Type", "application/json");
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
