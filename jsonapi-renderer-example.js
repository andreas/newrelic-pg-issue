"use strict";

const jsonapiRenderer = require("jsonapi-renderer");

const queryModel = {
  type: "query",
  attributes: {
    now: {
      async get({ client }) {
        const result = await client.query("select pg_sleep(1), now()");
        return new Date(result.rows[0].now).toString();
      },
      renderByDefault: true,
    },
  },
};

module.exports = function (client) {
  return jsonapiRenderer([queryModel]).render(
    [
      { jsonapiType: "query", id: 1 },
      { jsonapiType: "query", id: 2 },
    ],
    { resolution: { client } }
  );
};
