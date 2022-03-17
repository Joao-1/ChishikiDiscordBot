import { Intents } from "discord.js";

export default {
	CHISHIKI_API: {
		URL: process.env.CHISHIKI_API_URL,
	},
	DISCORD_API: {
		CLIENT_ID: process.env.CLIENT_ID,
		TOKEN: process.env.BOT_TOKEN,
		INTENTS: {
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
		},
	},
};
