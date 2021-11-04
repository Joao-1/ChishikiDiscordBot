import { botAPI, SlashCommandsRest } from './types/types.d';
import { promisify } from 'util';
import { Client, ClientOptions, Collection } from 'discord.js';
import glob from 'glob';
import { ICommand } from './types/types';
import { IConfig } from './types/types';
import logger from '../logs/logger';
import { IGuild } from './types/types';
import Cache from './cache/cache';

class Bot extends Client {
    public commands: Collection<string, ICommand> = new Collection();
    public cache: Cache = new Cache();
    public chishikiAPI: botAPI;
    private slashCommandsMethods: SlashCommandsRest;

    constructor(clientOptions: ClientOptions, api: botAPI, slashCommandsMethods: SlashCommandsRest) {
        super(clientOptions);
        this.chishikiAPI = api;
        this.slashCommandsMethods = slashCommandsMethods;
    }

    async start(config: IConfig) {
        try {
            await this.loadCommands();
            await this.loadEvents();
            await this.slashCommandsMethods.deploy(this.commands, '751646711251730452');
            await this.login(config.token);
            await this.syncData();
        } catch (error) {
            logger.error(error);
            process.exit();
        }
    }

    async loadCommands() {
        const commandFiles: string[] = await promisify(glob)(`${__dirname}/bot/commands/**/*{.ts,.js}`);
        commandFiles.forEach(async (pathToCommand: string) => {
            const command: ICommand = require(pathToCommand);
            if (command.thisIsGlobal) this.commands.set(command.data.name, command);
        });
    }

    async loadEvents() {
        const eventFiles: string[] = await promisify(glob)(`${__dirname}/bot/events/**/*{.ts,.js}`);

        eventFiles.forEach(async (value: string) => {
            const event = require(value);
            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args, this));
            } else {
                this.on(event.name, (...args) => event.execute(...args, this));
            }
        });
    }

    async syncData() {
        const allGuilds: IGuild[] = await this.chishikiAPI.getAllGuilds();

        this.guilds.cache.forEach(async guild => {
            if (!allGuilds.some(existingGuilds => existingGuilds.id == guild.id)) {
                const newGuild = await this.chishikiAPI.registerGuild(guild.id);
                allGuilds.push(newGuild);
            }
        });

        allGuilds.forEach(guild => {
            this.cache.set(guild.id, guild, 60000);
        });
    }

    async registerNewGuildInSystem(guildId: string) {
        const newGuild = await this.chishikiAPI.registerGuild(guildId);
        await this.cache.set(guildId, newGuild, 60000);
        return this.cache.get(newGuild.id);
    }
}

export default Bot;
