import { Client } from 'discord.js';

export = {
    name: 'ready',
    once: true,
    execute(client: Client) {
        console.log(`Bot online em ${client.guilds.cache.size} servidores`);
    },
};
