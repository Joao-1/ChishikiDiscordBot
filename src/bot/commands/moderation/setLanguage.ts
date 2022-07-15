import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { TFunction } from "i18next";
import ChishikiClient from "../../../chishiki";
import { ICommand, IGuild } from "../../../structure";

export default class LanguageCommand implements ICommand {
	client: ChishikiClient;
	data = new SlashCommandBuilder()
		.setName("language")
		.setDescription("Choose the language Chishiki will use on this server")
		.addStringOption((optionOne) =>
			optionOne
				.setName("server")
				.setDescription("Choose the language Chishiki will speak on this server")
				.addChoice("to portuguese", "portuguese")
				.addChoice("to english", "english")
		);

	scope: "public" | "private" | "custom" = "public";

	constructor(client: ChishikiClient) {
		this.client = client;
	}

	async execute(interaction: CommandInteraction, locale: TFunction, guildCached: IGuild) {
		if (!interaction.options.data[0]) {
			interaction.reply(locale("commands:language.languageNotProvided"));
		}

		const newLanguage = interaction.options.data[0].value as string;
		// await this.client.API.guilds.update(guildCached.id, { language: newLanguage });
		guildCached.language = newLanguage;
		await this.client.cache.set(guildCached.id, guildCached, 60_000);
		interaction.reply(guildCached.language);
	}
}
