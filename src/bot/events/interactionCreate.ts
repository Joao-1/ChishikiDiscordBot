import { CommandInteraction } from "discord.js";
import i18next from "i18next";
import logger from "../../../logs/logger";
import ChishikiClient from "../../chishiki";
import { IEvent } from "../../structure";

export default class interactionCreateEvent implements IEvent {
	client: ChishikiClient;
	name = "interactionCreate";
	once = false;

	constructor(client: ChishikiClient) {
		this.client = client;
	}

	async execute(interaction: CommandInteraction) {
		if (!interaction.isCommand()) return;
		if (!interaction.guildId) return;
		let guildCached = await this.client.cache.get(interaction.guildId);

		if (!guildCached) {
			guildCached = await this.client.registerNewGuildInSystem(interaction.guildId);
			if (!guildCached) throw new Error("Error retrieving guild data");
		}

		const command = this.client.commands.get(interaction.commandName);
		if (!command) return;

		const locale = i18next.getFixedT(guildCached.language || "en-US");

		try {
			command.execute(interaction, locale, guildCached);
		} catch (error) {
			logger.error(error);
		}
	}
}
