import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction, MessageEmbed } from "discord.js";
import Bot from "../../../bot";

export default {
	data: new SlashCommandBuilder().setName("ping").setDescription("Replies with pong?"),
	scope: "global",
	async execute(interaction: BaseCommandInteraction, bot: Bot) {
		const newEmbed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle("Pong!")
			.setFields({ name: "ping:", value: `${bot.ws.ping}ms` });
		await interaction.reply({ embeds: [newEmbed] });
	},
};
