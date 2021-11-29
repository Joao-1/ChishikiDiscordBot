/* eslint-disable no-unused-vars */
import { SlashCommandBuilder } from "@discordjs/builders";
import { Collection, Message } from "discord.js";
import Bot from "../bot";
export interface IConfig {
	clientId: string;
	token: string;
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

export interface IPropertiesThatCanBeUpdated {
	prefix?: string;
	language?: string;
}

export interface ICommand {
	data: SlashCommandBuilder;
	thisIsGlobal: boolean;
	execute(interaction: CommandInteraction | Message, guildCached: IGuild, bot: Bot): void;
}

export interface IBotAPI {
	getAllGuilds(): Promise<IGuild[]>;
	registerGuild(guild: string): Promise<IGuild>;
	updateGuild(guildId: string, newValues: IPropertiesThatCanBeUpdated): unknown;
}

export interface SlashCommandsRest {
	deploy(commands: Collection<string, ICommand>, guildId?: string): Promise<unknown>;
	delete(commandNameToDelete: string, guildId?: string): Promise<unknown>;
}
