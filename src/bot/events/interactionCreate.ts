import { CommandInteraction } from "discord.js";
import i18next from "i18next";
import logger from "../../../logs/logger";
import Bot from "../../chishiki";

export default {
	name: "interactionCreate",
	once: false,
	async execute(interaction: CommandInteraction, bot: Bot) {
		if (!interaction.isCommand()) return;
		if (!interaction.guildId) return;
		let guildCached = await bot.cache.get(interaction.guildId);

		if (!guildCached) {
			try {
				guildCached = await bot.registerNewGuildInSystem(interaction.guildId);
				if (!guildCached) throw new Error("Error retrieving guild data");
			} catch (error) {
				logger.error(error);
				return;
			}
		}

		const locale = i18next.getFixedT(guildCached.language || "pt-BR");
		const command = bot.commands.get(interaction.commandName);
		if (!command) return;

		try {
			command.execute({ interaction, guildCached, bot, locale });
		} catch (error) {
			logger.error(error);
		}
	},
};
