import Commands from "./commands/commands";
import { IDiscordRoutesAPI } from "./structure";

export default class DiscordRoutesAPI implements IDiscordRoutesAPI {
	commands = new Commands();
}
