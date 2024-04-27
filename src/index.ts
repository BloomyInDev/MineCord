import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import config from "./config.json" assert { type: "json" };
import { summonBot } from "./mine.js";
import { CustomClient } from "./types.js";
import { interactionCreateEvent } from "./events/interactionCreate.js";
import { readyEvent } from "./events/ready.js";
import { readdirSync } from "fs";
import { join } from "path";
import { __dirname, __filename } from "./utils.js";

const client: CustomClient = new Client({
    partials: [Partials.Channel, Partials.GuildMember, Partials.User],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildVoiceStates,
    ],
});
client.commands = new Collection();
const commandPath = join(__dirname, "commands");
readdirSync(commandPath)
    .filter((f) => f.endsWith(".js") || f.endsWith(".ts"))
    .forEach(async (file) => {
        const cmd = await import(`./commands/${file}`);
        if ("data" in cmd && "execute" in cmd) {
            client.commands?.set(cmd.data.name, cmd);
        } else {
            console.warn(`Command "${file}" isn't complete`);
        }
    });

client.once("ready", readyEvent);
client.on("interactionCreate", interactionCreateEvent);

client.login(config.token);
