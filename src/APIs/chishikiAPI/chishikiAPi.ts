import axios from "axios";
import CommandsAPI from "./commands/commandsAPI";
import GuildsAPI from "./guilds/guildsAPI";
import { IBotAPI } from "./structure";

export default class ChishikiAPI implements IBotAPI {
	guilds = new GuildsAPI();

	commands = new CommandsAPI();

	async ping(apiUrl: string) {
		return axios.get(`${apiUrl}/ping`);
	}
}
