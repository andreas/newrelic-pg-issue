"use strict";

const newrelic = require("newrelic");
const { Client } = require("pg");

const graphqlExample = require("./graphql-example");
const jsonapiRendererExample = require("./jsonapi-renderer-example");

// UPDATE THIS TO YOUR LOCAL SETUP
const PG_URI = "postgres://username:password@localhost:5432/database";

const client = new Client(PG_URI);

async function main() {
  try {
    await client.connect();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }

  // Run graphql example
  const graphqlResult = await graphqlExample(client);
  console.log(`graphql returned: ${JSON.stringify(graphqlResult)}`);

  // Run jsonapi-renderer example
  const jsonapiResult = await jsonapiRendererExample(client);
  console.log(`jsonapi-renderer returned: ${JSON.stringify(jsonapiResult)}`);
}

main();
