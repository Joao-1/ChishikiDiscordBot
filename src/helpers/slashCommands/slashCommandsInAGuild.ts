import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/rest/v9";
import { ApplicationCommand } from "discord.js";
import logger from "../../../logs/logger";
import { ICommandExecute } from "../../structure";
import { SlashCommandsRest } from "./structure";

export default class SlashCommandsInAGuild implements SlashCommandsRest {
	private restMethods: REST = new REST({ version: "9" });

	// eslint-disable-next-line no-unused-vars
	constructor(private clientId: string, token: string) {
		this.restMethods = this.restMethods.setToken(token);
	}

	async deploy(commands: ICommandExecute, specificsGuildsIds?: string[]) {
		if (specificsGuildsIds) {
			for (let i = 0; i <= specificsGuildsIds.length; i += 1) {
				this.restMethods.put(
					Routes.applicationGuildCommands(this.clientId as `${bigint}`, serverId as `${bigint}`),
					{
						body: commandsToDeployInAGuild,
					}
				) as unknown as ApplicationCommand[];
			}
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
			logger.error(error);
		}
	}

	private async executeDeploy(serverId: string, commandsToDeployInAGuild: unknown) {
		try {
			return this.restMethods.put(
				Routes.applicationGuildCommands(this.clientId as `${bigint}`, serverId as `${bigint}`),
				{
					body: commandsToDeployInAGuild,
				}
			) as unknown as ApplicationCommand[];
		} catch (error) {
			logger.error(error);
			throw error;
		}
	}
}
