import { Events } from "discord.js";
import { GalaxyEvent } from "../interfaces/galaxy";

const event: GalaxyEvent = {
    name: Events.ClientReady,
    once: true,
    run: (client) => {
        console.log(`Logged in as ${client.user?.tag}`);
    }
}

export default event;