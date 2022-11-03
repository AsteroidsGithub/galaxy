import { GalaxyEvent } from '../interfaces/galaxy';
import { Events, Interaction } from 'discord.js';

const event: GalaxyEvent = {
    name: Events.InteractionCreate,
    once: false,
    run: async (client, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.run(client, interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
    },
};

export default event;
