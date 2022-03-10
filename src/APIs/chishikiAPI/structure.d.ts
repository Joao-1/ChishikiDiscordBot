/* eslint-disable no-unused-vars */
import { ICommandAPI, IGuild } from "../../structure";

export interface IPropertiesThatCanBeUpdated {
	prefix?: string;
	language?: string;
}

export interface IGuildsMethods {
	getAll(): Promise<IGuild[]>;
	register(guild: string): Promise<IGuild>;
	update(guildId: string, newValues: IPropertiesThatCanBeUpdated): unknown;
}

export interface ICommandsMethods {
	register(commandId: string, scope: "public" | "private" | "custom"): Promise<ICommandAPI>;
}

export interface IBotAPI {
	guilds: IGuildsMethods;
	commands: ICommandsMethods;
}
