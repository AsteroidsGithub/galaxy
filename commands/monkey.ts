import { GalaxyCommand } from '../interfaces/galaxy';
import { ChatInputCommandInteraction, SlashCommandBuilder,  } from 'discord.js';

const event: GalaxyCommand = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Gives information about a player')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('The user to get information about')
                    .setRequired(false)
        ),
    run: async (client, interaction: ChatInputCommandInteraction) => {
        await interaction.reply('🐒🐒🐒');
    },
};

export default event;
