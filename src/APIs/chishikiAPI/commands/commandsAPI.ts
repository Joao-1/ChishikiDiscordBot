import axios from "axios";
import config from "../../../config/config";
import { ICommandAPI } from "../../../structure.d";
import { ICommandsMethods } from "../structure.d";

export default class CommandsAPI implements ICommandsMethods {
	async register(name: string, description: string, scope: "public" | "private" | "custom") {
		try {
			const newGuild = await axios.post(`${config.apiURL}/commands`, {
				name,
				description,
				scope,
			});
			return newGuild.data as unknown as ICommandAPI;
		} catch (error: any) {
			console.log(error.response.data);
			throw new Error(error);
		}
	}

	async get() {
		try {
			const guilds = await axios.get(`${config.apiURL}/commands`);
			return guilds.data.guilds as unknown as ICommandAPI[];
		} catch (error: any) {
			throw new Error(error.data);
		}
	}
}
