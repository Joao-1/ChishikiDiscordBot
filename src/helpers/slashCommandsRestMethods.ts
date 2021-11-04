import { REST } from "@discordjs/rest";
import { ApplicationCommand, Collection } from "discord.js";
import { ICommand, SlashCommandsRest } from "../types/types";
import transformCommandsToJson from "../utils/transformCommandsToJson";
import { Routes } from 'discord-api-types/rest/v9';
import logger from "../../logs/logger";

export class SlashCommandsGlobally implements SlashCommandsRest {
    private restMethods: REST;
    private clientId: string;

    constructor(clientId: string, token: string) {
        this.restMethods = new REST({ version: '9' }).setToken(token);
        this.clientId = clientId;
    }

    async deploy(commands: Collection<string, ICommand>) {
        const commandsToDeployGlobally = transformCommandsToJson(commands);

        try {
            await this.restMethods.put(Routes.applicationCommands(this.clientId as `${bigint}`), {
                body: commandsToDeployGlobally,
            });
        } catch (error) {
            logger.error(error);
        }
    }

    async delete(commandNameToDelete: string) {
        try {
            const globallyCommands = (await this.restMethods.get(
                Routes.applicationCommands(this.clientId as `${bigint}`)
            )) as ApplicationCommand[];

            const globalCommandIdToDelete = globallyCommands.find((command) => commandNameToDelete === command.name);

            if (!globalCommandIdToDelete) throw new Error(`Command not found`);

            await this.restMethods.delete(
                Routes.applicationCommand(this.clientId as `${bigint}`, globalCommandIdToDelete.id as `${bigint}`)
            );
        } catch (error) {
            logger.error(error);
        }
    }
};

export class SlashCommandsInAGuild implements SlashCommandsRest {
    private restMethods: REST;
    private clientId: string;

    constructor(clientId: string, token: string) {
        this.restMethods = new REST({ version: '9' }).setToken(token);
        this.clientId = clientId;
    }

    async deploy(commands: Collection<string, ICommand>, guildId: string, ) {
        const commandsToDeployInAGuild = transformCommandsToJson(commands);

        try {
            await this.restMethods.put(Routes.applicationGuildCommands(this.clientId as `${bigint}`, guildId as `${bigint}`), {
                    body: commandsToDeployInAGuild,
                });
        } catch (error) {
            logger.error(error);
        }
    }

    async delete(commandNameToDelete: string, guildId: string) {
        try {
            const guildCommands = (await this.restMethods.get(
                Routes.applicationGuildCommands(this.clientId as `${bigint}`, guildId as `${bigint}`)
            )) as ApplicationCommand[];

            const localCommandToDelete = guildCommands.find((command) => commandNameToDelete === command.name);

            if (!localCommandToDelete) throw new Error(`Command not found`);

            await this.restMethods.delete(
                Routes.applicationGuildCommand(
                    this.clientId as `${bigint}`,
                    guildId as `${bigint}`,
                    localCommandToDelete.id as `${bigint}`
                )
            );
        } catch (error) {
            logger.error(error)
        }
    }
};
