import logger from "../logs/logger";
import ChishikiAPI from "./APIs/chishikiAPI/chishikiAPi";
import DiscordRoutesAPI from "./APIs/DiscordRoutesAPI/discordRoutesAPI";
import Redis from "./cache/redis/redis";
import ChishikiBot from "./chishiki";
import config from "./config";
import SlashCommands from "./helpers/slashCommands/slashCommandsInAGuild";

const { app, apis } = config;
const { DISCORD_SERVER_DEFAULT_ID } = app;
const { TOKEN, CLIENT_ID, INTENTS } = apis.DISCORD_API;

if (!TOKEN || !CLIENT_ID || !INTENTS || !DISCORD_SERVER_DEFAULT_ID)
	throw new Error(`Env file is missing some value, ${apis.DISCORD_API}`);

const chishikiAPI = new ChishikiAPI();
const redisCache = new Redis();
const discordRoutesAPI = new DiscordRoutesAPI();
const slashCommands = new SlashCommands(CLIENT_ID, discordRoutesAPI, TOKEN);

const chishiki = new ChishikiBot(INTENTS, chishikiAPI, redisCache, slashCommands);

(async () => {
	await chishikiAPI
		.ping(apis.CHISHIKI_API.URL as string)
		.then((response) => {
			if (response.status !== 200) throw new Error("Could not connect with API");
			logger.log({ level: "info", message: "Successfully connected to API" });
		})
		.catch((requestError) => {
			logger.log(requestError);
			process.exit();
		});

	await chishiki.start({ CLIENT_ID, TOKEN, DISCORD_SERVER_DEFAULT_ID });
})();

export default chishiki;
