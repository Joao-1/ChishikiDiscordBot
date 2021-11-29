import axios from "axios";
import logger from "./logs/logger";
import ChishikiAPI from "./src/APIs/chishikiAPi";
import Bot from "./src/bot";
import config from "./src/config/config";
import SlashCommandsGlobally from "./src/helpers/slashCommands/slashCommandGlobally";
import SlashCommandsInAGuild from "./src/helpers/slashCommands/slashCommandsInAGuild";
import { SlashCommandsRest } from "./src/types/types.d";

const { clientId, token, intents } = config;
if (!token || !clientId) throw new Error("Missing Token or ClientId");

const chishikiAPI = new ChishikiAPI();
let slashCommandsMethods: SlashCommandsRest;

// eslint-disable-next-line no-unused-expressions
(process.env.NODE_ENV as string).trim() === "dev"
	? (slashCommandsMethods = new SlashCommandsInAGuild(clientId, token))
	: (slashCommandsMethods = new SlashCommandsGlobally(clientId, token));

const bot = new Bot(intents, chishikiAPI, slashCommandsMethods);

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
