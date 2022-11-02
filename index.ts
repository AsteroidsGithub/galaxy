import "dotenv/config";
import { Client, ClientOptions } from "discord.js";

class GalaxyClient extends Client {
    constructor(token: string, clientOptions: ClientOptions) {
        super(clientOptions);

        this.token = token;
    }

    public start() {
        if (!this.token) throw new Error("No token provided");

        this.login(this.token);
    }

}

const client = new GalaxyClient(process.env.token, { intents: ["Guilds"] });

client.start()