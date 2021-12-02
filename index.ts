import axios from "axios";
import logger from "./logs/logger";
import ChishikiAPI from "./src/APIs/chishikiAPi";
import Bot from "./src/bot";
import config from "./src/config/config";
import SlashCommandsGlobally from "./src/helpers/slashCommands/slashCommandGlobally";
import SlashCommandsInAGuild from "./src/helpers/slashCommands/slashCommandsInAGuild";

const { clientId, token, intents } = config;
if (!token || !clientId) throw new Error("Missing Token or ClientId");

const chishikiAPI = new ChishikiAPI();

const bot = new Bot(
	intents,
	chishikiAPI,
	new SlashCommandsGlobally(clientId, token),
	new SlashCommandsInAGuild(clientId, token)
);

(async () => {
	await axios
		.get(`${config.apiURL}/ping`)
		.then((response) => {
			if (response.status !== 200) throw new Error("Could not connect with API");
			console.log("Successfully connected to API");
		})
		.catch((requestError) => {
			logger.log(requestError);
			process.exit();
		});

	await bot.start({ clientId, token });
})();

export default bot;
