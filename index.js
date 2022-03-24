const server = require("./src/app.js");
const { conn } = require("./src/db.js");

conn.sync().then(() => {
  server.listen(process.env.PORT || 5000, () => {
    console.log(`%s listening at ${process.env.PORT} `);
  });
});
