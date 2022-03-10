/* eslint-disable no-unused-vars */
import { Client, ClientOptions, Collection } from "discord.js";
import glob from "glob";
import { promisify } from "util";
import logger from "../logs/logger";
import { IBotAPI } from "./APIs/chishikiAPI/structure";
import Cache from "./cache/cache";
import { SlashCommandsRest } from "./helpers/slashCommands/structure";
import { IConfig, IGuild } from "./structure";
import { ICommandExecute } from "./structure.d";

export default class Bot extends Client {
	public commands: Collection<string, ICommandExecute> = new Collection();

	public cache: Cache;

	constructor(
		clientOptions: ClientOptions,
		readonly API: IBotAPI,
		private globalCommandsMethods: SlashCommandsRest,
		private privateCommandsMethods: SlashCommandsRest
	) {
		super(clientOptions);
	}

	async start(config: IConfig) {
		try {
			await this.loadEvents();
			await this.loadCommands();
			// await this.loadCache();
			await this.login(config.token);
			await this.deployCommands(config.discordServerDefault);
			await this.syncGuilds();
			// await this.syncCommands();
		} catch (error) {
			logger.error(error);
			process.exit();
		}
	}

	async loadCommands() {
		const commandFiles: string[] = await promisify(glob)(`${__dirname}/bot/commands/**/*{.ts,.js}`);

		commandFiles.forEach(async (pathToCommand: string) => {
			const command: ICommandExecute = require(pathToCommand).default;
			this.commands.set(command.data.name, command);
		});
	}

	async loadEvents() {
		const eventFiles: string[] = await promisify(glob)(`${__dirname}/bot/events/**/*{.ts,.js}`);

		eventFiles.forEach(async (value: string) => {
			const event = require(value).default;
			if (event.once === "true") {
				this.once(event.name, (...args) => event.execute(...args, this));
			} else {
				this.on(event.name, (...args) => event.execute(...args, this));
			}
		});
	}

	async loadCache() {
		this.cache = new Cache();
	}

	async deployCommands(discordServerDefault: string) {
		await this.globalCommandsMethods.deploy(
			this.commands.filter((commandsDetails) => commandsDetails.scope === "public")
		);
		await this.privateCommandsMethods.deploy(
			this.commands.filter(
				(commandsDetails) => commandsDetails.scope === "private" || commandsDetails.scope === "custom",
				discordServerDefault
			)
		);
	}

	async syncGuilds() {
		const allGuildsInAPI: IGuild[] = await this.API.guilds.getAll();

		this.guilds.cache.forEach(async (guildInDiscord) => {
			if (!allGuildsInAPI.some((guildsInAPI) => guildsInAPI.id === guildInDiscord.id)) {
				const newGuild = await this.API.guilds.register(guildInDiscord.id);
				allGuildsInAPI.push(newGuild);
			}
		});

		allGuildsInAPI.forEach((guild) => {
			this.cache.set(guild.id, guild, 60000);
		});
	}

	// async syncCommands() {
	// 	const allCommandsInAPI: ICommandAPI[] = await this.API.commands.getAll();

	// 	this.commands.forEach(async (commandLoaded) => {
	// 		if (!allCommandsInAPI.some((commandsInAPI) => commandsInAPI.name === commandLoaded.data.name)) {
	// 			const newCommands = await this.API.commands.register(commandLoaded.data.name, commandLoaded.scope);
	// 			allCommandsInAPI.push(newCommands);
	// 		}
	// 	});
	// 	allCommandsInAPI.forEach((command) => {
	// 		this.cache.set(command.name, command, 60000);
	// 	});
	// }

	// async registerNewGuildInSystem(guildId: string) {
	// 	const newGuild = await this.API.registerGuild(guildId);
	// 	await this.cache.set(guildId, newGuild, 60000);
	// 	return this.cache.get(guildId);
	// }
}
