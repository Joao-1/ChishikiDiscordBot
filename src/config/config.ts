import { Intents } from "discord.js";

export default {
	clientId: process.env.CLIENT_ID,
	token: process.env.BOT_TOKEN,
	discordServerDefault: process.env.DISCORD_SERVER_DEFAULT_ID,
	intents: {
		intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
	},
	apiURL: process.env.URL_API,
};
