
import fs from "fs"
import { REST, Routes } from "discord.js"
import "dotenv/config"
import { GalaxyCommand } from "./interfaces/galaxy";

(async () => {
    if (!process.env.TOKEN) throw new Error("No token provided");
    if (!process.env.GUILD_ID) throw new Error("No guild id provided");
    if (!process.env.CLIENT_ID) throw new Error("No client id provided");

    const commands = [];
    // Grab all the command files from the commands directory you created earlier
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));

    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const command: GalaxyCommand = await import(`./commands/${file}`).then((module) => module.default);
        commands.push(command.data.toJSON());
    }

    // Construct and prepare an instance of the REST module
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    // and deploy your commands!
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();