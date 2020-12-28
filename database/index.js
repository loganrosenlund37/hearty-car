const Arango = require('arangojs').Database;

const arangoURI = "http://localhost:8529";
const db = new Arango(arangoURI);
db.useDatabase("heartyCar");
db.useBasicAuth("root", "");

module.exports = db;
