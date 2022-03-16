/* eslint-disable no-unused-vars */
import { REST } from "@discordjs/rest";
import { ApplicationCommand } from "discord.js";

/* eslint-disable no-unused-vars */
export default interface IDiscordRoutesAPIPublicCommands {
	update(
		rest: REST,
		clientId: string,
		commands: {
			name: string;
			description: string;
		}[]
	): Promise<ApplicationCommand<{}>[]>;
}

export interface IDiscordRoutesAPIPrivateCommands {
	update(
		rest: REST,
		clientId: string,
		guildId: string,
		commands: {
			name: string;
			description: string;
		}[]
	): Promise<ApplicationCommand<{}>[]>;
}

export interface IDiscordRoutesAPICommands {
	private: IDiscordRoutesAPIPrivateCommands;
	public: IDiscordRoutesAPIPublicCommands;
}

export interface IDiscordRoutesAPI {
	commands: IDiscordRoutesAPICommands;
}
