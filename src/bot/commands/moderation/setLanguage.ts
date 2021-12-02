import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import Bot from "../../../bot";
import { IGuildCache } from "../../../types/types";

export default {
	data: new SlashCommandBuilder()
		.setName("language")
		.setDescription("Choose the language Chishiki will use on the server")
		.addStringOption((option) =>
			option
				.setName("switch")
				.setDescription("Choose the language Chishiki will speak on this server")
				.addChoice("to portuguese", "portuguese")
				.addChoice("to english", "english")
				.addChoice("to japonese", "japonese")
		),
	scope: "global",

	async execute(interaction: CommandInteraction, guildCached: IGuildCache, bot: Bot) {
		if (!interaction.options.data[0]) {
			interaction.reply("Preciso saber a linguagem que você deseja que eu fale");
			return;
		}
		const newLanguage = interaction.options.data[0].value as string;
		await bot.API.updateGuild(guildCached.id, { language: newLanguage });
		guildCached.language = newLanguage;
		await bot.cache.set(guildCached.id, guildCached, 60000);
		interaction.reply(guildCached.language);
	},
};
