import axios from "axios";
import logger from "../logs/logger";
import ChishikiAPI from "./APIs/chishikiAPI/chishikiAPi";
import DiscordRoutesAPI from "./APIs/DiscordRoutesAPI/discordRoutesAPI";
import Redis from "./cache/redis";
import Bot from "./chishiki";
import config from "./config";
import SlashCommands from "./helpers/slashCommands/slashCommandsInAGuild";

const { app, apis } = config;
const { DISCORD_SERVER_DEFAULT_ID } = app;
const { TOKEN, CLIENT_ID, INTENTS } = apis.DISCORD_API;

if (!TOKEN || !CLIENT_ID || !INTENTS || !DISCORD_SERVER_DEFAULT_ID) throw new Error("Env file is missing some value");

const chishikiAPI = new ChishikiAPI();
const redisCache = new Redis();
const discordRoutesAPI = new DiscordRoutesAPI();
const slashCommands = new SlashCommands(CLIENT_ID, discordRoutesAPI, TOKEN);

const bot = new Bot(INTENTS, chishikiAPI, redisCache, slashCommands);

(async () => {
	await axios
		.get(`${apis.CHISHIKI_API.URL}/ping`)
		.then((response) => {
			if (response.status !== 200) throw new Error("Could not connect with API");
			logger.log({ level: "info", message: "Successfully connected to API" });
		})
		.catch((requestError) => {
			logger.log(requestError);
			process.exit();
		});

	await bot.start({ CLIENT_ID, TOKEN, DISCORD_SERVER_DEFAULT_ID });
})();

export default bot;
