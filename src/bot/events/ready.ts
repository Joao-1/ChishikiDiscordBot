import logger from "../../../logs/logger";
import ChishikiClient from "../../chishiki";
import { IEvent } from "../../structure";

export default class ReadyEvent implements IEvent {
	client: ChishikiClient;
	name = "ready";
	once = true;

	constructor(client: ChishikiClient) {
		this.client = client;
	}

	async execute() {
		logger.info(`Bot online em ${this.client.guilds.cache.size} servidores`);
	}
}
