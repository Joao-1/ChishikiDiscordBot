import { IDiscordRoutesAPICommands } from "../structure";
import PrivateCommandsDiscordAPI from "./private/privatesCommandsDiscordAPI";
import PublicCommandsDiscordAPI from "./pubic/publicCommandsDiscordAPI";

export default class Commands implements IDiscordRoutesAPICommands {
	private = new PrivateCommandsDiscordAPI();

	public = new PublicCommandsDiscordAPI();
}
