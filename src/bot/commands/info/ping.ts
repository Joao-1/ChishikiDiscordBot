import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { ICommandExecute } from "../../../structure";

export default {
	data: new SlashCommandBuilder().setName("ping").setDescription("replies with your Discord ping!"),
	scope: "public",
	async execute({ interaction, bot }) {
		const newEmbed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle("Pong!")
			.setFields({ name: "ping:", value: `${bot.ws.ping}ms` });
		await interaction.reply({ embeds: [newEmbed] });
	},
} as ICommandExecute;
