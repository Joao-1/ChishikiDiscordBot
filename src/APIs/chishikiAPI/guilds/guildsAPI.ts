import axios from "axios";
import config from "../../../config/config";
import { IGuild } from "../../../structure";
import { IGuildsMethods, IPropertiesThatCanBeUpdated } from "../structure";

export default class GuildsAPI implements IGuildsMethods {
	async register(guildId: string) {
		try {
			const registredGuild = await axios.post(`${config.apiURL}/guilds`, { id: guildId });
			return registredGuild.data as unknown as IGuild;
		} catch (error: any) {
			throw new Error(error.data);
		}
	}

	async getAll() {
		try {
			const guilds = await axios.get(`${config.apiURL}/guilds`);
			return guilds.data.guilds as unknown as IGuild[];
		} catch (error: any) {
			throw new Error(error.data);
		}
	}

	async update(guildId: string, newValues: IPropertiesThatCanBeUpdated) {
		try {
			return axios.put(`${config.apiURL}/guilds/${guildId}`, newValues);
		} catch (error: any) {
			throw new Error(error.data);
		}
	}
}
