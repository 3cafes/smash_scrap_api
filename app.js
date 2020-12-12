const express = require("express");
const prompts = require("prompts");
const { scrap, Scraper, ScrapTask } = require("./src/scraper");

const app = express();
const port = 3000;
const scraper = new Scraper();

app.get("/", async (req, res) => {
	console.log("start scrapping");
	await scraper.scrap();
	res.send("Hello World!");
});

app.listen(port, async () => {
	await scraper.init();

	console.log(`Example app listening at http://localhost:${port}`);

	const data = await scraper.select_all(
		"https://www.smashbros.com/en_US/fighter/index.html",
		"li.fighter-list__item",
		(elems) => {
			return elems.map((elem) => {
				const id = elem.querySelector("em.fighter-list__num-txt").innerText;
				const name = elem.querySelector("p.fighter-list__name-main").innerText;
				return {
					id,
					name,
				};
			});
		},
		(entry) => {
			return entry.id && entry.name;
		}
	);
	console.log("end scrap", data);
	// const cmd = await prompts({
	//   name: "cmd",
	//   type: "confirm",
	//   message: "Let's go?",
	// });
	// console.log(cmd);
});
