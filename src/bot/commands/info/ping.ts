import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Message, MessageEmbed } from "discord.js";
import ChishikiClient from "../../../chishiki";
import { ICommand } from "../../../structure";

export default class PingCommand implements ICommand {
	client: ChishikiClient;
	data = new SlashCommandBuilder().setName("ping").setDescription("replies with your Discord ping!");
	scope: "public" | "private" | "custom" = "public";

	constructor(client: ChishikiClient) {
		this.client = client;
	}

	async execute(interaction: CommandInteraction | Message) {
		const newEmbed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle("Pong!")
			.setFields({ name: "ping:", value: `${this.client.ws.ping}ms` });
		await interaction.reply({ embeds: [newEmbed] });
	}
}
