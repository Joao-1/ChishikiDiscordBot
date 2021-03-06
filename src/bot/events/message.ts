import { Message } from "discord.js";
import i18next from "i18next";
import logger from "../../../logs/logger";
import ChishikiClient from "../../chishiki";
import { IEvent } from "../../structure";

export default class MessageCreateEvent implements IEvent {
	client: ChishikiClient;
	name = "messageCreate";
	once = false;

	constructor(client: ChishikiClient) {
		this.client = client;
	}

	async execute(message: Message) {
		if (message.author.bot) return;
		if (message.channel.type === "DM") return;

		if (!message.guildId) return;

		let guildCached = await this.client.cache.get(message.guildId);

		if (!guildCached) {
			guildCached = await this.client.registerNewGuildInSystem(message.guildId);
			if (!guildCached) throw new Error("Error retrieving guild data");
		}

		const { prefix, language } = guildCached;

		if (!message.content.toLocaleLowerCase().startsWith(prefix)) return;

		const messageContent: string[] = message.content.slice(prefix.length).trim().split(/ +/g);
		const typedCommand = messageContent.shift();
		if (!typedCommand) return;

		const commandFromBot = this.client.commands.get(typedCommand);
		if (!commandFromBot) return;

		const locale = i18next.getFixedT(language || "en-US");

		try {
			commandFromBot.execute(message, locale, guildCached);
		} catch (error) {
			logger.error(error);
		}
	}
}
