import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/rest/v9";
import { ApplicationCommand, Collection } from "discord.js";
import logger from "../../../logs/logger";
import { ICommand, SlashCommandsRest } from "../../types/types";
import transformCommandsToJson from "../../utils/transformCommandsToJson";

export default class SlashCommandsInAGuild implements SlashCommandsRest {
	// eslint-disable-next-line prettier/prettier
	private restMethods: REST;

	private clientId: string;

	constructor(clientId: string, token: string) {
		this.restMethods = new REST({ version: "9" }).setToken(token);
		this.clientId = clientId;
	}

	async deploy(commands: Collection<string, ICommand>, guildId: string) {
		const commandsToDeployInAGuild = transformCommandsToJson(commands);

		try {
			await this.restMethods.put(
				Routes.applicationGuildCommands(this.clientId as `${bigint}`, guildId as `${bigint}`),
				{
					body: commandsToDeployInAGuild,
				}
			);
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
			logger.error(error);
		}
	}
}
