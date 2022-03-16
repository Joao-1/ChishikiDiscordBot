import { Collection } from "discord.js";
import { ICommandExecute } from "../structure";

export = (commands: Collection<string, ICommandExecute>) => {
	const commandsToDeploy: unknown[] = [];

	commands.forEach((command: ICommandExecute) => {
		commandsToDeploy.push(command.data.toJSON());
	});

	return commandsToDeploy;
};
