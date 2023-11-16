import { GalaxyEvent } from '../interfaces/galaxy';
import { Events, Interaction } from 'discord.js';

const event: GalaxyEvent = {
    name: Events.InteractionCreate,
    once: false,
    run: async (client, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        await client.db.discordUser
            .findUnique({
                where: {
                    discordId: interaction.user.id,
                },
            })
            .then(async (user) => {
                if (!user) {
                    await client.db.discordUser.create({
                        data: {
                            discordId: interaction.user.id,
                            balance: 0,
                        },
                    });

                    console.log(`Created user ${interaction.user.id}`);
                }
            });

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
