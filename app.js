const e = require('express');
const express = require('express');
const prompts = require('prompts');
const cors = require('cors');
const scraper = require('./scraper');

const app = express();
const port = 3001;

app.use(cors());
app.use('/api', require('./routes'));
app.listen(port, async () => {
	await scraper.init();

	console.log(`Example app listening at http://localhost:${port}`);

	// console.log(data);
	// const cmd = await prompts({
	//   name: "cmd",
	//   type: "confirm",
	//   message: "Let's go?",
	// });
	// console.log(cmd);
});
