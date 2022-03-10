import axios from "axios";
import config from "../../../config/config";
import { IGuild } from "../../../structure";
import { IGuildsMethods, IPropertiesThatCanBeUpdated } from "../structure";

export default class GuildsAPI implements IGuildsMethods {
	async register(guildId: string) {
		const newGuild = await axios.post(`${config.apiURL}/guilds`, { id: guildId });
		if (!newGuild.data) throw new Error("It was not possible to register a new guild");
		return newGuild.data as unknown as IGuild;
	}

	async getAll() {
		const guilds = await axios.get(`${config.apiURL}/guilds`);
		if (!guilds) throw new Error("Não foi possivel recuperar as guildas");
		return guilds.data.guilds as IGuild[];
	}

	async update(guildId: string, newValues: IPropertiesThatCanBeUpdated) {
		const updatedGuild = await axios.put(`${config.apiURL}/guilds/${guildId}`, newValues);
		if (updatedGuild.status !== 204) throw new Error("It was not possible to update a guild");
		return updatedGuild.status;
	}
}
