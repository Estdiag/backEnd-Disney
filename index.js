const server = require("./src/app.js");
const { conn } = require("./src/db.js");

conn.sync().then(() => {
  server.listen(3001, async () => {
    console.log("listening at 3001");
  });
});
