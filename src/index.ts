import { Client, GatewayIntentBits, Partials } from "discord.js";
import config from "./config.json" assert {type:"json"}


const client = new Client({
    partials: [Partials.Channel, Partials.GuildMember, Partials.User],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.once("ready",(client)=>{
    console.log(`Logged id as ${client.user.username}`)
})

client.login(config.token)