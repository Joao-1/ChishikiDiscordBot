import axios from "axios";
import config from "../../../config";
import { IGuild } from "../../../structure";
import { IGuildsMethods, IPropertiesThatCanBeUpdated } from "../structure";

const { apis } = config;
export default class GuildsAPI implements IGuildsMethods {
	async register(guildId: string) {
		try {
			const registredGuild = await axios.post(`${apis.CHISHIKI_API.URL}/guilds`, { id: guildId });
			return registredGuild.data as unknown as IGuild;
		} catch (error: any) {
			throw new Error(error.data);
		}
	}

	async getAll() {
		try {
			const guilds = await axios.get(`${apis.CHISHIKI_API.URL}/guilds`);
			return guilds.data.guilds as unknown as IGuild[];
		} catch (error: any) {
			throw new Error(error.data);
		}
	}

	async update(guildId: string, newValues: IPropertiesThatCanBeUpdated) {
		try {
			return axios.put(`${apis.CHISHIKI_API.URL}/guilds/${guildId}`, newValues);
		} catch (error: any) {
			throw new Error(error.data);
		}
	}
}
