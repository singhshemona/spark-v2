// inspiration from: 
// https://dev.to/alexeagleson/how-to-connect-a-react-app-to-a-notion-database-51mc

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

const getBlocks = async (block_id: string) => {
  const response = await notion.blocks.children.list({
    block_id,
    page_size: 50,
  });
  return response.results;
};

const getPage = async (page_id: string) => {
  const response = await notion.pages.retrieve({ page_id });
  return response;
};

const server = http.createServer(async (req, res) => {
  // Avoid CORS errors
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  switch (req.url) {
    case "/":
      const database = await notion.databases.query({
        database_id: notionDatabaseId,
      });

      const results = database.results;
      const randomIndex = getRandomIndex(0, results.length);
      let block = results[randomIndex];

      // if the Source's relation array is empty it is
      // a start card and therefore cannot be used
      // so we need to pick another card that has a source
      // @ts-ignore - figure out why I need this
      if (block.properties.Source.relation.length === 0) {
        block = results[randomIndex + 1];
      }

      const blockId = block.id;
      const sourceId =
        // @ts-ignore
        block.properties.Source.relation[0].id;

      // GET TITLE
      const title = block.properties.Title;

      // GET LINK
      // @ts-ignore
      const link = block.public_url;

      // GET QUOTE
      const quote = await getBlocks(blockId);

      // GET SOURCE
      const source = await getPage(sourceId);

      // store all data in here and eventually return this
      const allContent = {
        title,
        quote,
        source,
        link,
      };

      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify(allContent));
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
