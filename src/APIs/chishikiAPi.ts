import axios from "axios";
import config from "../config/config";
import { IBotAPI, IGuild, IPropertiesThatCanBeUpdated } from "../types/types.d";

class ChishikiAPI implements IBotAPI {
	async getAllGuilds() {
		const guilds = await axios.get(`${config.apiURL}/guild`);
		if (!guilds) throw new Error("Não foi possivel recuperar as guildas");
		return guilds.data.guilds as IGuild[];
	}

	async registerGuild(guildId: string) {
		const newGuild = await axios.post(`${config.apiURL}/guild`, { id: guildId });
		if (!newGuild.data) throw new Error("It was not possible to register a new guild");
		return newGuild.data as unknown as IGuild;
	}

	async updateGuild(guildId: string, newValues: IPropertiesThatCanBeUpdated) {
		const updatedGuild = await axios.put(`${config.apiURL}/guild/${guildId}`, newValues);
		if (updatedGuild.status !== 204) throw new Error("It was not possible to update a guild");
		return updatedGuild.status;
	}
}

export default ChishikiAPI;
