const express = require("express");
const prompts = require("prompts");
const scraper = require("./src/scraper");

const testModule = require("./src/scraper/browser_instance");
testModule();

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
	console.log("start scrapping");
	await scraper.scrap();
	res.send("Hello World!");
});

app.listen(port, async () => {
	console.log(`Example app listening at http://localhost:${port}`);
	// const cmd = await prompts({
	//   name: "cmd",
	//   type: "confirm",
	//   message: "Let's go?",
	// });
	// console.log(cmd);
});
