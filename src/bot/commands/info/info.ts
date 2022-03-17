import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction } from "discord.js";
import { ICommandExecute } from "../../../structure";

export default {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Get info about a user or a server!!")
		.addStringOption((option) => option.setName(`teste`).setDescription(`apenas um teste`)),
	scope: "public",

	async execute(interaction: BaseCommandInteraction) {
		await interaction.reply("info!");
	},
} as ICommandExecute;
