import axios from "axios";
import logger from "../logs/logger";
import ChishikiAPI from "./APIs/chishikiAPI/chishikiAPi";
import Bot from "./bot";
import config from "./config/config";
import SlashCommandsGlobally from "./helpers/slashCommands/slashCommandGlobally";
import SlashCommandsInAGuild from "./helpers/slashCommands/slashCommandsInAGuild";

const { clientId, token, intents, discordServerDefault } = config;

if (!token || !clientId) throw new Error("Missing Token or ClientId");
if (!discordServerDefault) throw new Error("Missing Discord Default Server");

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
			logger.log({ level: "info", message: "Successfully connected to API" });
		})
		.catch((requestError) => {
			logger.log(requestError);
			process.exit();
		});

	await bot.start({ clientId, token, discordServerDefault });
})();

export default bot;
