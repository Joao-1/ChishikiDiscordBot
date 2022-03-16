import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/rest/v9";
import { ApplicationCommand } from "discord.js";
import IDiscordRoutesAPIPublicCommands from "../../structure";

export default class PublicCommandsDiscordAPI implements IDiscordRoutesAPIPublicCommands {
	async update(rest: REST, clientId: string, commands: { name: string; description: string }[]) {
		return rest.put(Routes.applicationCommands(clientId as `${bigint}`), {
			body: commands,
		}) as unknown as ApplicationCommand[];
	}
}
