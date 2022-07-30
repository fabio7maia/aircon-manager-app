const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const url = process.env.OPENAPI_URL;
const dest = path.join(__dirname, "../.gen/api");

console.log("get OpenApi > start");

axios
  .get(url)
  .then((res) => {
    if (fs.existsSync(dest)) {
      fs.rmdirSync(dest, { recursive: true });
    }

    fs.mkdirSync(dest, { recursive: true });

    fs.writeFileSync(path.join(dest, "openapi.json"), JSON.stringify(res.data));

    console.log("get OpenApi > end");
  })
  .catch((err) => console.error("get OpenApi > raise error", err));
