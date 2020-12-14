const express = require('express');
const cors = require('cors');
const readline = require('readline');
const db = require('./database');
const scraper = require('./scraper');
const smash_scrap = require('./smash_scrap');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const app = express();
const port = 3001;
app.use(cors());
app.use('/api', require('./routes'));

const CMD = {
	quit: () => process.exit(),
	scrap_players: async () => {
		console.log('scrap players...');
		await smash_scrap.update_players();
	},
	scrap_items: async () => {
		console.log('scrap items...');
		await smash_scrap.update_items();
	},
};

async function cli() {
	const prompt =
		'what do you want to do next ? (scrap_players, scrap_items, quit)';
	console.log(prompt);
	for await (const action of rl) {
		if (CMD[action]) {
			await CMD[action]();
		} else {
			console.log('Unknow command.');
		}
		console.log(prompt);
	}
}

app.listen(port, async () => {
	await scraper.init();
	console.log(`Example app listening at http://localhost:${port}`);

	cli();
});

process.on('exit', async () => {
	console.log('goodbye.');
	rl.close();
	await db.$disconnect();
});
