import { Client, ClientOptions, Collection, Events, SlashCommandBuilder } from "discord.js";
import fs from "fs"

interface GalaxyEvent {
    name: string;
    once: boolean;
    run: (client: GalaxyClient, ...args: any[]) => void;
}

interface GalaxyCommand {
    data: SlashCommandBuilder;
    run: (client: GalaxyClient, interaction: any) => void;
}


class GalaxyClient extends Client {
    public events: Collection<string, GalaxyEvent>
    public commands: Collection<string, GalaxyCommand>

    constructor(token: string | null, clientOptions: ClientOptions) {
        super(clientOptions);

        this.token = token;
        this.events = new Collection();
        this.commands = new Collection();
    }

    public start() {
        if (!this.token) throw new Error("No token provided");

        this.login(this.token);
        this.loadEvents();
        this.loadCommands();
    }

    private loadEvents() {
        console.log("Loading events...");

        fs.readdirSync("./events").filter(file => file.endsWith('.ts')).forEach(async (file) => {

            const event: GalaxyEvent = await import(`../events/${file}`).then((module) => module.default);
            this.events.set(event.name, event);

            console.log(`Loaded event ${event.name}`);

            event.once ? this.once(event.name, (...args) => event.run(this, ...args)) : this.on(event.name, (...args) => event.run(this, ...args));
        })
    }

    private loadCommands() {
        console.log("Loading commands...");

        fs.readdirSync("./commands").filter(file => file.endsWith('.ts')).forEach(async (file) => {

            const command: GalaxyCommand = await import(`../commands/${file}`).then((module) => module.default);
            this.commands.set(command.data.name, command);

            console.log(`Loaded command ${command.data.name}`);

        })
    }
}

export {
    GalaxyCommand, GalaxyEvent, GalaxyClient
};