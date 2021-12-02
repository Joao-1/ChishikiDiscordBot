import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Get info about a user or a server!!")
		.addStringOption((option) => option.setName(`teste`).setDescription(`apenas um teste`)),
	scope: "private",
	allowedServers: ["598200219665956895"],

	async execute(interaction: BaseCommandInteraction) {
		await interaction.reply("info!");
	},
};
