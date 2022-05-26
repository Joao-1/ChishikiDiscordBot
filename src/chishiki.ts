import { Client, ClientOptions, Collection } from "discord.js";
import glob from "glob";
import { promisify } from "util";
import logger from "../logs/logger";
import { IBotAPI } from "./APIs/chishikiAPI/structure";
import Cache from "./cache/redis/redis";
import { SlashCommandsRest } from "./helpers/slashCommands/structure";
import { ICommandExecute, IDiscordConfig, IGuild } from "./structure";

export default class ChishikiBot extends Client {
	public commands: Collection<string, ICommandExecute> = new Collection();

	constructor(
		clientOptions: ClientOptions /* eslint-disable no-unused-vars */,
		readonly API: IBotAPI,
		readonly cache: Cache,
		readonly slashCommands: SlashCommandsRest /* eslint-enable no-unused-vars */
	) {
		super(clientOptions);
	}

	async start({ TOKEN, DISCORD_SERVER_DEFAULT_ID }: IDiscordConfig) {
		try {
			await this.loadEvents();
			await this.loadCommands();
			await this.deployCommands(DISCORD_SERVER_DEFAULT_ID);
			await this.login(TOKEN);
			await this.syncGuilds();
		} catch (error) {
			console.log(error);
			logger.error(error);
			process.exit();
		}
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

	async loadCommands() {
		const commandFiles: string[] = await promisify(glob)(`${__dirname}/bot/commands/**/*{.ts,.js}`);

		commandFiles.forEach(async (pathToCommand: string) => {
			const command: ICommandExecute = require(pathToCommand).default;
			this.commands.set(command.data.name, command);
		});
	}

	async deployCommands(discordServerDefault: string) {
		if (process.env.NODE_ENV === "dev") {
			await this.slashCommands.deploy(this.commands, [discordServerDefault]);
			return;
		}

		const publicCommands = this.commands.filter(({ scope }) => scope === "public");
		const privateCommands = this.commands.filter(({ scope }) => scope === "private" || scope === "custom");

		await this.slashCommands.deploy(publicCommands);
		await this.slashCommands.deploy(privateCommands, [discordServerDefault]);
	}

	async syncGuilds() {
		const allGuildsInAPI: IGuild[] = await this.API.guilds.getAll();

		this.guilds.cache.forEach(async (guildInDiscord) => {
			if (!allGuildsInAPI.some((guildInAPI) => guildInAPI.id === guildInDiscord.id)) {
				const newGuild = await this.API.guilds.register(guildInDiscord.id);
				allGuildsInAPI.push(newGuild);
			}
		});

		allGuildsInAPI.forEach((guild) => {
			this.cache.set(guild.id, guild, 60_000);
		});
	}

	async registerNewGuildInSystem(guildId: string) {
		const newGuild = await this.API.guilds.register(guildId);
		await this.cache.set(guildId, newGuild, 60_000);
		return this.cache.get(guildId);
	}
}
