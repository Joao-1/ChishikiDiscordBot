/* eslint-disable no-unused-vars */
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Message } from "discord.js";
import Bot from "./bot";

// export type If<T extends boolean, A, B = null> = T extends true ? A : T extends false ? B : A | B;
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
	id: string;
	name: string;
	description: string;
	status: string;
	servers: string;
	scope: "public" | "private" | "custom";
}

export interface ICommandExecute {
	data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
	scope: "public" | "private" | "custom";
	execute(interaction: CommandInteraction | Message, guildCached: IGuild, bot: Bot): void;
}
