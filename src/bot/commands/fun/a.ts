import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { ICommandExecute } from "../../../structure";

export default {
	data: new SlashCommandBuilder().setName("a").setDescription("a"),
	scope: "private",
	async execute({ interaction }) {
		const newEmbed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle("A")
			.setImage("https://i.ytimg.com/vi/vKGm6diTM34/maxresdefault.jpg");
		await interaction.reply({ embeds: [newEmbed] });
	},
} as ICommandExecute;
