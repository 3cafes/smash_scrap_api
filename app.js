const express = require('express');
const cors = require('cors');
const readline = require('readline');
const db = require('./database');
const scraper = require('./scraper');
const smash_scrap = require('./smash_scrap');

const CMD = {
	scrap_players: async () => {
		console.log('scrap players...');
		await smash_scrap.update_players();
	},
	scrap_items: async () => {
		console.log('scrap items...');
		await smash_scrap.update_items();
	},
	scrap_stages: async () => {
		console.log('scrap stages...');
		await smash_scrap.update_stages();
	},
};

var server;
const app = express();
const port = 3001;
app.use(cors());

//API ROUTES
app.use('/api', require('./routes'));

async function read_cmd(prompt) {
	var response;
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.setPrompt(prompt);
	rl.prompt();
	return new Promise((resolve, reject) => {
		rl.on('line', (userInput) => {
			response = userInput;
			rl.close();
		});
		rl.on('close', () => {
			resolve(response);
		});
	});
}

async function cli() {
	const prompt = `what do you want to do next ?
(scrap_players, scrap_items, scrap_stages, quit)
$ `;
	let run = true;
	while (run) {
		const action = await read_cmd(prompt);
		if (CMD[action]) {
			await CMD[action]();
		} else if (action == 'quit') {
			run = false;
			process.exit(0);
		} else {
			console.log('Unknow command.');
		}
	}
}

server = app.listen(port, async () => {
	await scraper.init();
	console.log(`Example app listening at http://localhost:${port}`);

	await cli();
});

process.on('exit', async () => {
	console.log('goodbye.');
	await db.$disconnect();
	server.close();
});
