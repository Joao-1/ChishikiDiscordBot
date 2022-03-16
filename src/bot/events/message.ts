import { Message } from "discord.js";
import logger from "../../../logs/logger";
import Bot from "../../bot";

export default {
	name: "messageCreate",
	once: false,
	async execute(message: Message, bot: Bot) {
		if (message.author.bot) return;
		if (message.channel.type === "DM") return;

		if (!message.guildId) return;

		let guildCached = await bot.cache.get(message.guildId);

		if (!guildCached) {
			try {
				guildCached = await bot.registerNewGuildInSystem(message.guildId);
				if (!guildCached) throw new Error("Error retrieving guild data");
			} catch (error) {
				logger.error(error);
				return;
			}
		}

		const { prefix } = guildCached;

		if (!message.content.toLocaleLowerCase().startsWith(prefix)) return;
		const messageContent: string[] = message.content.slice(prefix.length).trim().split(/ +/g);
		const typedCommand = messageContent.shift();
		if (!typedCommand) return;

		const commandFromBot = bot.commands.get(typedCommand);
		if (!commandFromBot) return;
		// if (!commandFromBot.allowedServers?.includes(message.guild.id)) {
		// 	message.reply("sem permissão!");
		// 	return;
		// }
		try {
			commandFromBot.execute(message, guildCached, bot);
		} catch (error) {
			logger.error(error);
		}
	},
};
