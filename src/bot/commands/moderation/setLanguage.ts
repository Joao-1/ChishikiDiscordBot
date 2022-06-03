import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Message } from "discord.js";
import ChishikiClient from "../../../chishiki";
import { IGuild } from "../../../structure";

export default class LanguageCommand {
	client: ChishikiClient;
	scope = "public" as const;
	data = new SlashCommandBuilder()
		.setName("language")
		.setDescription("Choose the language Chishiki will use on the server")
		.addStringOption((option) =>
			option
				.setName("switch")
				.setDescription("Choose the language Chishiki will speak on this server")
				.addChoice("to portuguese", "portuguese")
				.addChoice("to english", "english")
				.addChoice("to japonese", "japonese")
		);

	constructor(client: ChishikiClient) {
		this.client = client;
	}

	async execute(interaction: CommandInteraction | Message, guildCached: IGuild) {
		if (!(interaction as CommandInteraction).options.data[0]) {
			interaction.reply("Preciso saber a linguagem que você deseja que eu fale");
			return;
		}
		const newLanguage = (interaction as CommandInteraction).options.data[0].value as string;
		await this.client.API.guilds.update(guildCached.id, { language: newLanguage });
		guildCached.language = newLanguage;
		await this.client.cache.set(guildCached.id, guildCached, 60_000);
		interaction.reply(guildCached.language);
	}
}
