import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction, MessageEmbed } from "discord.js";

export default {
	data: new SlashCommandBuilder().setName("a").setDescription("a"),
	scope: "global",
	allowedServers: ["598200219665956895"],
	async execute(interaction: BaseCommandInteraction) {
		const newEmbed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle("A")
			.setImage("https://i.ytimg.com/vi/vKGm6diTM34/maxresdefault.jpg");
		await interaction.reply({ embeds: [newEmbed] });
	},
};
