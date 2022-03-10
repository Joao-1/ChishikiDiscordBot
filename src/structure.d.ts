/* eslint-disable no-unused-vars */
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Message } from "discord.js";
import Bot from "./bot";

export interface IConfig {
	clientId: string;
	token: string;
	discordServerDefault: string;
}

export interface IGuild {
	id: string;
	prefix: string;
	language: string;
}

export interface IGuildCache extends IGuild {
	createdAt: string;
	updatedAt: string;
}

export interface ICommandAPI {
	id: number;
	name: string;
	description: string;
	status: string;
	servers: string;
	scope: "public" | "private" | "custom";
}

export interface ICommandExecute {
	// eslint-disable-next-line func-names
	[Symbol.iterator] = function* () {
		let properties = Object.keys(this);
		for (let i of properties) {
			yield [i, this[i]];
		}
	};
	data: SlashCommandBuilder;
	scope: "public" | "private" | "custom";
	execute(interaction: CommandInteraction | Message, guildCached: IGuild, bot: Bot): void;
}
