import { GalaxyCommand } from './interfaces/galaxy';
import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import fs from 'fs';

(() => {
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    Promise.all(
        fs
            .readdirSync('./commands')
            .filter((file) => file.endsWith('.ts'))
            .map(async (file) => {
                try {
                    const command: GalaxyCommand = await import(`./commands/${file}`).then(
                        (module) => module.default
                    );
                    return await command.data.toJSON();
                } catch (error) {
                    console.error(error);
                }
            })
    ).then(async (commands) => {
        if (!process.env.TOKEN) throw new Error('No token provided');
        if (!process.env.GUILD_ID) throw new Error('No guild id provided');
        if (!process.env.CLIENT_ID) throw new Error('No client id provided');

        // Construct and prepare an instance of the REST module
        const rest = new REST().setToken(process.env.TOKEN);

        console.log(await commands);

        // and deploy your commands!
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            // The put method is used to fully refresh all commands in the guild with the current set
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: await commands }
            );

            console.log(`Successfully reloaded application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    });
})();
