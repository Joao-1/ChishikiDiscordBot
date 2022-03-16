/* eslint-disable no-unused-vars */
import { ICommandAPI, IGuild } from "../../structure";

export interface IPropertiesThatCanBeUpdated {
	prefix?: string;
	language?: string;
}

export interface IGuildsMethods {
	register(guild: string): Promise<IGuild>;
	getAll(): Promise<IGuild[]>;
	update(guildId: string, newValues: IPropertiesThatCanBeUpdated): unknown;
}

export interface ICommandsMethods {
	register(name: string, description: string, scope: "public" | "private" | "custom"): Promise<ICommandAPI>;
	get(): Promise<ICommandAPI[]>;
}

export interface IBotAPI {
	guilds: IGuildsMethods;
	commands: ICommandsMethods;
}
