import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Message } from "discord.js";
import { TFunction } from "i18next";
import ChishikiClient from "../../../chishiki";
import { ICommand } from "../../../structure";

export default class InfoCommand implements ICommand {
	client: ChishikiClient;
	data = new SlashCommandBuilder().setName("info").setDescription("Get info about a user or a server!!");
	scope: "public" | "private" | "custom" = "public";

	constructor(client: ChishikiClient) {
		this.client = client;
	}

	async execute(interaction: CommandInteraction | Message, locale: TFunction) {
		await interaction.reply(locale("commands:info.message"));
	}
}
