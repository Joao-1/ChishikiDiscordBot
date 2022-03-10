import axios from "axios";
import config from "../../../config/config";
import { ICommandAPI } from "../../../structure.d";
import { ICommandsMethods } from "../structure.d";

export default class CommandsAPI implements ICommandsMethods {
	async register(commandId: string, scope: "public" | "private" | "custom") {
		const newCommand = await axios.post(`${config.apiURL}/commands`, { id: commandId, scope });
		if (!newCommand.data) throw new Error("It was not possible to register a new command");
		return newCommand.data as unknown as ICommandAPI;
	}
}
