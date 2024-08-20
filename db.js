const { MongoClient } = require("mongodb");
let dbConnection;

module.exports = {
  // connect to db
  connectToDb: (cb) => {
    MongoClient.connect("mongodb://localhost:27017/bookist")
      .then((client) => {
        dbConnection = client.db();
        cb();
      })
      .catch((err) => {
        console.error(err);
        cb(err);
      });
  },

  //   return db connection
  getDb: () => dbConnection,
};
