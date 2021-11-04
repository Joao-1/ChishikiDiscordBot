import { SlashCommandBuilder } from '@discordjs/builders';
import { BaseCommandInteraction } from 'discord.js';

export = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about a user or a server!!')
        .addStringOption((option) => option.setName(`teste`).setDescription(`apenas um teste`)),
    thisIsGlobal: true,

    async execute(interaction: BaseCommandInteraction) {
        await interaction.reply('info!');
    },
};
