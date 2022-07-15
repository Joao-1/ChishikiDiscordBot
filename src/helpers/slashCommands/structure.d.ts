/* eslint-disable no-unused-vars */
import { ApplicationCommand, Collection } from "discord.js";
import { ICommandExecute } from "../../structure";

export interface ISlashCommandsRest {
	deploy(
		command: Collection<string, ICommandExecute>,
		specificsGuildsIds?: string[] | undefined
	): Promise<ApplicationCommand<Record<string, never>> | ApplicationCommand<Record<string, never>>[]>;
	delete(commandNameToDelete: string, guildId?: string): Promise<void>;
}
