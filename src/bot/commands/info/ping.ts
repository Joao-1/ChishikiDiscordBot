import { SlashCommandBuilder } from '@discordjs/builders';
import { BaseCommandInteraction } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import Bot from '../../../bot';
export = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with pong?'),
    thisIsGlobal: true,
    async execute(interaction: BaseCommandInteraction, bot: Bot) {
        const newEmbed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('Pong!')
            .setFields(
                { name: 'ping:', value: `${bot.ws.ping}ms` }
            )
        await interaction.reply({ embeds: [newEmbed] })
    },
};
