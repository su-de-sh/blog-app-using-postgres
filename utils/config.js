require("dotenv");

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3001;
const SEKRET = "Think and grow rich";

module.exports = { DATABASE_URL, PORT, SEKRET };
