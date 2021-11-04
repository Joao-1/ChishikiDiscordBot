import { Message, BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

import Bot from '../bot';

export interface ICommand {
    data: SlashCommandBuilder;
    thisIsGlobal: boolean;
    async execute(interaction: BaseCommandInteraction | Message, bot: Bot): void;
}


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

export interface botAPI {
    getAllGuilds(): Promise<any | null>;
    registerGuild(guild: string): Promise<IGuild>
}

export interface SlashCommandsRest {
    deploy(commands: Collection<string, ICommand>, guildId?: string): Promise<any>
    delete(commandNameToDelete: string, guildId?: string): Promise<any>
}