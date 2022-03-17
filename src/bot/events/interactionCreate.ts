import { CommandInteraction } from "discord.js";
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

		const command = bot.commands.get(interaction.commandName);
		if (!command) return;

		try {
			command.execute(interaction, guildCached, bot);
		} catch (error) {
			logger.error(error);
		}
	},
};
