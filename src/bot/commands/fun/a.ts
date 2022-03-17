import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction, MessageEmbed } from "discord.js";
import { ICommandExecute } from "../../../structure";

export default {
	data: new SlashCommandBuilder().setName("a").setDescription("gura"),
	scope: "private",
	async execute(interaction: BaseCommandInteraction) {
		const newEmbed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle("A")
			.setImage("https://i.ytimg.com/vi/vKGm6diTM34/maxresdefault.jpg");
		await interaction.reply({ embeds: [newEmbed] });
	},
} as ICommandExecute;
