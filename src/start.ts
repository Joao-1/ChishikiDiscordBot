import axios from "axios";
import logger from "../logs/logger";
import ChishikiAPI from "./APIs/chishikiAPI/chishikiAPi";
import DiscordRoutesAPI from "./APIs/DiscordRoutesAPI/discordRoutesAPI";
import Bot from "./bot";
import Redis from "./cache/redis";
import config from "./config/config";
import SlashCommands from "./helpers/slashCommands/slashCommandsInAGuild";

const { clientId, token, intents, discordServerDefault } = config;

if (!token || !clientId) throw new Error("Missing Token or ClientId");
if (!discordServerDefault) throw new Error("Missing Discord Default Server");

const chishikiAPI = new ChishikiAPI();
const redisCache = new Redis();
const discordRoutesAPI = new DiscordRoutesAPI();
const slashCommands = new SlashCommands(clientId, discordRoutesAPI, token);

const bot = new Bot(intents, chishikiAPI, redisCache, slashCommands);

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
