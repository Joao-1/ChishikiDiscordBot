import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction, MessageEmbed } from "discord.js";
import Bot from "../../../bot";
import { ICommandExecute } from "../../../structure";

export default {
	data: new SlashCommandBuilder().setName("pong").setDescription("Replies with pong?"),
	scope: "public",
	async execute(interaction: BaseCommandInteraction, _guildCache, bot: Bot) {
		const newEmbed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle("Pong!")
			.setFields({ name: "ping:", value: `${bot.ws.ping}ms` });
		await interaction.reply({ embeds: [newEmbed] });
	},
} as ICommandExecute;
