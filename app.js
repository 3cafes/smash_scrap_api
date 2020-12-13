const e = require('express');
const express = require('express');
const prompts = require('prompts');
const cors = require('cors');
const scraper = require('./scraper');
const db = require('./database');

const app = express();
const port = 3001;

app.use(cors());
app.use('/api', require('./routes'));

async function main() {
	await scraper.init();
	app.listen(port, async () => {
		console.log(`Example app listening at http://localhost:${port}`);
	});
}

main()
	.catch((e) => {
		console.log(e);
		throw e;
	})
	.finally(async () => {
		await db.$disconnect();
	});
