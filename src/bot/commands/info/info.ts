import { SlashCommandBuilder } from "@discordjs/builders";
import { ICommandExecute } from "../../../structure";

export default {
	data: new SlashCommandBuilder().setName("info").setDescription("Get info about a user or a server!!"),
	scope: "public",

	async execute({ interaction, locale }) {
		await interaction.reply(locale("commands:info.message"));
	},
} as ICommandExecute;
