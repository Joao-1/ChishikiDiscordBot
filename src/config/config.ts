import { Intents } from "discord.js";
import getEnv from "../utils/getEnv";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({
	path: getEnv(),
});

export default {
	clientId: process.env.CLIENT_ID,
	token: process.env.BOT_TOKEN,
	intents: {
		intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
	},
	apiURL: process.env.URL_API,
};
