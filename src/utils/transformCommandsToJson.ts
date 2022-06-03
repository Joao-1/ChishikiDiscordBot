import { Collection } from "discord.js";
import { ICommand } from "../structure";

export = (commands: Collection<string, ICommand>) => {
	const commandsToDeploy: unknown[] = [];

	commands.forEach((command: ICommand) => {
		commandsToDeploy.push(command.data.toJSON());
	});

	return commandsToDeploy;
};
