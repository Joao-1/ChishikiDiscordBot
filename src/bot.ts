import { Client, ClientOptions, Collection } from "discord.js";
import glob from "glob";
import { promisify } from "util";
import logger from "../logs/logger";
import Cache from "./cache/cache";
import { ICommand, IConfig, IGuild } from "./types/types";
import { IBotAPI, SlashCommandsRest } from "./types/types.d";

class Bot extends Client {
	public commands: Collection<string, ICommand> = new Collection();

	public cache: Cache;

	public API: IBotAPI;

	private slashCommandsMethods: SlashCommandsRest;

	constructor(clientOptions: ClientOptions, api: IBotAPI, slashCommandsMethods: SlashCommandsRest) {
		super(clientOptions);
		this.API = api;
		this.slashCommandsMethods = slashCommandsMethods;
	}

	async start(config: IConfig) {
		try {
			await this.loadEvents();
			await this.loadCommands();
			await this.loadCache();
			await this.login(config.token);
			await this.syncData();
			await this.slashCommandsMethods.deploy(this.commands, "751646711251730452");
		} catch (error) {
			console.log(error);
			logger.error(error);
			process.exit();
		}
	}

	async loadCommands() {
		const commandFiles: string[] = await promisify(glob)(`${__dirname}/bot/commands/**/*{.ts,.js}`);
		commandFiles.forEach(async (pathToCommand: string) => {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const command: ICommand = require(pathToCommand).default;
			if (command.thisIsGlobal) this.commands.set(command.data.name, command);
		});
	}

	async loadEvents() {
		const eventFiles: string[] = await promisify(glob)(`${__dirname}/bot/events/**/*{.ts,.js}`);

		eventFiles.forEach(async (value: string) => {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
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

	async syncData() {
		const allGuilds: IGuild[] = await this.API.getAllGuilds();

		this.guilds.cache.forEach(async (guild) => {
			if (!allGuilds.some((existingGuild) => existingGuild.id === guild.id)) {
				const newGuild = await this.API.registerGuild(guild.id);
				allGuilds.push(newGuild);
			}
		});

		allGuilds.forEach((guild) => {
			this.cache.set(guild.id, guild, 60000);
		});
	}

	async registerNewGuildInSystem(guildId: string) {
		const newGuild = await this.API.registerGuild(guildId);
		await this.cache.set(guildId, newGuild, 60000);
		return this.cache.get(guildId);
	}
}

export default Bot;
