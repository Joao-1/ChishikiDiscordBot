import { BaseCommandInteraction } from "discord.js";
import logger from "../../../logs/logger";
import Bot from "../../bot";

export default {
	name: "interactionCreate",
	once: false,
	execute(interaction: BaseCommandInteraction, bot: Bot) {
		if (!interaction.isCommand()) return;

		const command = bot.commands.get(interaction.commandName);
		if (!command) return;

		try {
			command.execute(interaction, bot);
		} catch (error) {
			logger.error(error);
		}
	},
};
