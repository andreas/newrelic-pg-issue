This repo intents to illustrate an issue with how [`node-newrelic`](https://github.com/newrelic/node-newrelic) instruments [`node-postgres`](https://github.com/brianc/node-postgres). The issue is captured as a Github issue [here](https://github.com/newrelic/node-newrelic/issues/345).

To reproduce the issue, do the following:

1. `npm install`
2. You need to have a local Postgres instance running. Edit `index.js` and update `PG_URI` to a suitable connection string.
3. Edit `newrelic.js` and set an appropriate license key.
4. Run `npm run start`. You should see output like the following:

```
Connection has been established successfully.
graphql returned: {"data":{"now1":"Wed Feb 03 2021 15:14:24 GMT+0100 (Central European Standard Time)","now2":"Wed Feb 03 2021 15:14:25 GMT+0100 (Central European Standard Time)"}}
jsonapi-renderer returned: {"data":[{"type":"query","id":"1","attributes":{"now":"Wed Feb 03 2021 15:14:26 GMT+0100 (Central European Standard Time)"}},{"type":"query","id":"2","attributes":{"now":"Wed Feb 03 2021 15:14:27 GMT+0100 (Central European Standard Time)"}}]}
```

5. Observe in NewRelic that the database queries are reported with incorrect durations. In particular, some of the queries `SELECT pg_sleep(1), NOW()` are incorrectly reported to take 2 seconds, rather than 1 second. This is because the queries are run concurrently, but only one can run at a time, as also explained in [the Github issue mentioned above](https://igithub.com/newrelic/node-newrelic/issues/345).
