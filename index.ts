import axios from "axios";
import { Intents } from "discord.js";
import logger from "./logs/logger";
import ChishikiAPI from "./src/APIs/chishikiAPi";
import Bot from "./src/bot";
import config from "./src/config/config";
import SlashCommandsGlobally from "./src/helpers/slashCommands/slashCommandGlobally";
import SlashCommandsInAGuild from "./src/helpers/slashCommands/slashCommandsInAGuild";
import { SlashCommandsRest } from "./src/types/types.d";

if (!config.token || !config.clientId) throw new Error("Missing Token or ClientId");

const intents = {
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
};
const chishikiAPI = new ChishikiAPI();
let slashCommandsMethods: SlashCommandsRest;
// eslint-disable-next-line no-unused-expressions
(process.env.NODE_ENV as string).trim() === "dev"
	? (slashCommandsMethods = new SlashCommandsInAGuild(config.clientId, config.token))
	: (slashCommandsMethods = new SlashCommandsGlobally(config.clientId, config.token));

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
			throw new Error(requestError);
		});

	await bot.start({ clientId: config.clientId!, token: config.token! });
})();

export default bot;
