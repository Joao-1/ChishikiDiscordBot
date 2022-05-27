import { Message } from "discord.js";
import i18next from "i18next";
import logger from "../../../logs/logger";
import Bot from "../../chishiki";

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

		const locale = i18next.getFixedT(guildCached.language || "pt-BR");
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
			commandFromBot.execute({ interaction: message, guildCached, bot, locale });
		} catch (error) {
			logger.error(error);
		}
	},
};
