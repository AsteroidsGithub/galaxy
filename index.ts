import { Client, Collection, ClientOptions, Events } from "discord.js";
import fs from "fs";
import "dotenv/config";
import { GalaxyClient, GalaxyCommand, GalaxyEvent } from "./interfaces/galaxy";



const client = new GalaxyClient(process.env.TOKEN ?? null, { intents: ["Guilds"] });

client.start()