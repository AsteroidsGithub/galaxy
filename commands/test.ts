import { GalaxyCommand, GalaxyEvent } from '../interfaces/galaxy';
import { ChatInputCommandInteraction, Events, Interaction, SlashCommandBuilder } from 'discord.js';

const event: GalaxyCommand = {
    data: new SlashCommandBuilder().setName('test').setDescription('Test command'),
    run: async (client, interaction: ChatInputCommandInteraction) => {
        await interaction.reply('Hello world!');
    },
};

export default event;
