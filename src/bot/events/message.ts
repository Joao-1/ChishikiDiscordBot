import { Message } from "discord.js";
import logger from "../../../logs/logger";
import Bot from "../../bot";
import config from "../../config/config";

export default {
	name: "messageCreate",
	once: false,
	async execute(message: Message, bot: Bot) {
		if (message.author.bot) return;
		let prefix = config.botPrefix;

		if (message.guild?.id) {
			let guild = await bot.cache.get(message.guild.id);

			if (!guild) {
				try {
					guild = await bot.registerNewGuildInSystem(message.guild.id);
					if (!guild) throw new Error("Error retrieving guild data");
				} catch (error) {
					logger.error(error);
					return;
				}
			}

			prefix = guild.prefix;
		}

		if (!message.content.toLocaleLowerCase().startsWith(prefix)) return;

		const messageContent: string[] = message.content.slice(prefix.length).trim().split(/ +/g);
		const typedCommand = messageContent.shift();
		if (!typedCommand) return;

		const commandFrombot = bot.commands.get(typedCommand);
		if (!commandFrombot) return;

		try {
			commandFrombot.execute(message, bot);
		} catch (error) {
			logger.error(error);
		}
	},
};
