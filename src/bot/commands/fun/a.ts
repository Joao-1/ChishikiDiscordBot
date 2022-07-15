import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Message, MessageEmbed } from "discord.js";
import ChishikiClient from "../../../chishiki";
import { ICommand } from "../../../structure";

export default class ACommand implements ICommand {
	client: ChishikiClient;
	data = new SlashCommandBuilder().setName("a").setDescription("a");
	scope: "public" | "private" | "custom" = "private";

	constructor(client: ChishikiClient) {
		this.client = client;
	}

	async execute(interaction: CommandInteraction | Message) {
		const newEmbed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle("A")
			.setImage("https://i.ytimg.com/vi/vKGm6diTM34/maxresdefault.jpg");
		await interaction.reply({ embeds: [newEmbed] });
	}
}
