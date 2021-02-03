"use strict";

const graphql = require("graphql");

const queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    now: {
      type: graphql.GraphQLString,
      async resolve(_, __, { client }) {
        const result = await client.query("select pg_sleep(1), now()");
        return new Date(result.rows[0].now).toString();
      },
    },
  },
});

const schema = new graphql.GraphQLSchema({ query: queryType });

module.exports = function (client) {
  return graphql.graphql(schema, "{ now1: now, now2: now }", undefined, {
    client,
  });
};
