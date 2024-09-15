const mongoose = require("mongoose");

const mongoDB = () => {
  mongoose
    .connect(`${process.env.DB_KEY}`)
    .then(() => console.log("server on"))
    .catch(() => console.log("server failed"));
};

module.exports = {
  mongoDB
};