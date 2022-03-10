import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/rest/v9";
import { ApplicationCommand, Collection } from "discord.js";
import logger from "../../../logs/logger";
import { ICommandExecute } from "../../structure.d";
import transformCommandsToJson from "../../utils/transformCommandsToJson";
import { SlashCommandsRest } from "./structure";

export default class SlashCommandsGlobally implements SlashCommandsRest {
	private restMethods = new REST({ version: "9" });

	// eslint-disable-next-line no-unused-vars
	constructor(private clientId: string, token: string) {
		this.restMethods = this.restMethods.setToken(token);
	}

	async deploy(commands: Collection<string, ICommandExecute>) {
		try {
			await this.restMethods.put(Routes.applicationCommands(this.clientId as `${bigint}`), {
				body: transformCommandsToJson(commands),
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
}
