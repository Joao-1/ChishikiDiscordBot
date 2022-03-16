/* eslint-disable no-unused-vars */
import { ApplicationCommand, Collection } from "discord.js";
import { ICommandExecute } from "../../structure";

export interface SlashCommandsRest {
	deploy(
		command: Collection<string, ICommandExecute>,
		specificsGuildsIds?: string[] | undefined
	): Promise<ApplicationCommand<{}> | ApplicationCommand<{}>[]>;
	delete(commandNameToDelete: string, guildId?: string): Promise<void>;
}
