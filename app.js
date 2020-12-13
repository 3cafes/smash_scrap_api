const e = require("express");
const express = require("express");
const prompts = require("prompts");
const scraper = require("./src/scraper");
const { scrap_players } = require("./src/smash/scrap");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
	console.log("start scrapping");
	await scraper.scrap();
	res.send("Hello World!");
});

app.listen(port, async () => {
	await scraper.init();

	console.log(`Example app listening at http://localhost:${port}`);

	const data = await scrap_players();
	console.log(data);
	// const cmd = await prompts({
	//   name: "cmd",
	//   type: "confirm",
	//   message: "Let's go?",
	// });
	// console.log(cmd);
});
