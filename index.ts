import { GalaxyClient, GalaxyCommand, GalaxyEvent } from './interfaces/galaxy';
import { Client, ClientOptions, Collection, Events } from 'discord.js';
import 'dotenv/config';
import fs from 'fs';

const client = new GalaxyClient(process.env.TOKEN ?? null, { intents: ['Guilds'] });

client.start();
