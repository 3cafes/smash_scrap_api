const express = require("express");
const prompts = require("prompts");
//import puppeter from "puppeteer";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  const cmd = await prompts({
    name: "cmd",
    type: "confirm",
    message: "Let's go?",
  });
  console.log(cmd);
});
