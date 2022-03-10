/* eslint-disable no-unused-vars */
import { ApplicationCommand, Collection } from "discord.js";
import { ICommandExecute } from "../../structure";

export interface SlashCommandsRest {
	deploy(
		commands: Collection<string, ICommandExecute>,
		specificGuildId?: string | undefined
	): Promise<ApplicationCommand[] | undefined>;
	delete(commandNameToDelete: string, guildId?: string): Promise<void>;
}
