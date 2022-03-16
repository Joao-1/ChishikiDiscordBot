import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/rest/v9";
import { ApplicationCommand, Collection } from "discord.js";
import logger from "../../../logs/logger";
import { IDiscordRoutesAPI } from "../../APIs/DiscordRoutesAPI/structure.d";
import { ICommandExecute } from "../../structure";
import transformCommandsToJson from "../../utils/transformCommandsToJson";
import { SlashCommandsRest } from "./structure";

export default class SlashCommands implements SlashCommandsRest {
	private restMethods: REST = new REST({ version: "9" });

	// eslint-disable-next-line no-unused-vars
	constructor(private clientId: string, private discordRoutesAPI: IDiscordRoutesAPI, token: string) {
		this.restMethods = this.restMethods.setToken(token);
	}

	async deploy(command: Collection<string, ICommandExecute>, specificsGuildsIds?: string[]) {
		const commandJson = transformCommandsToJson(command) as { name: string; description: string }[];

		if (specificsGuildsIds) {
			const commandRegistred = {} as ApplicationCommand;
			for (const guildId of specificsGuildsIds) {
				// eslint-disable-next-line no-await-in-loop
				await this.discordRoutesAPI.commands.private.update(
					this.restMethods,
					this.clientId,
					guildId,
					commandJson
				);
			}

			return commandRegistred;
		}

		return this.discordRoutesAPI.commands.public.update(this.restMethods, this.clientId, commandJson);
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
