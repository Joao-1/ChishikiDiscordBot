import { SlashCommandBuilder } from '@discordjs/builders';
import { BaseCommandInteraction } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import Bot from '../../../bot';
export = {
    data: new SlashCommandBuilder().setName('a').setDescription('a'),
    thisIsGlobal: true,
    async execute(interaction: BaseCommandInteraction, bot: Bot) {
        const newEmbed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('A')
            .setImage('https://i.ytimg.com/vi/vKGm6diTM34/maxresdefault.jpg')
        await interaction.reply({ embeds: [newEmbed] })
    },
};
