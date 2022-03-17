import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/rest/v9";
import { ApplicationCommand } from "discord.js";
import { IDiscordRoutesAPIPrivateCommands } from "../../structure";

export default class PrivateCommandsDiscordAPI implements IDiscordRoutesAPIPrivateCommands {
	async update(rest: REST, clientId: string, guildId: string, commands: { name: string; description: string }[]) {
		return rest.put(Routes.applicationGuildCommands(clientId as `${bigint}`, guildId as `${bigint}`), {
			body: commands,
		}) as unknown as ApplicationCommand[];
	}
}
