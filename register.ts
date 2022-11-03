import { GalaxyCommand } from './interfaces/galaxy';
import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import fs from 'fs';

(async () => {
    if (!process.env.TOKEN) throw new Error('No token provided');
    if (!process.env.GUILD_ID) throw new Error('No guild id provided');
    if (!process.env.CLIENT_ID) throw new Error('No client id provided');

    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    const commands = fs
        .readdirSync('./commands')
        .filter((file) => file.endsWith('.ts'))
        .map(async (file) => {
            const command: GalaxyCommand = await import(`../commands/${file}`).then(
                (module) => module.default
            );
            return command.data.toJSON();
        });

    // Construct and prepare an instance of the REST module
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    // and deploy your commands!
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
