import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CustomClient } from "../types.js";
import { summonBot } from "../mine.js";
import config from "../config.json" assert { type: "json" };

export const data = new SlashCommandBuilder()
    .setName("connect")
    .setDescription("Connect to the server");

export const execute = async (client: CustomClient, interaction: CommandInteraction) => {
    if (client.minecraft == undefined) {
        client.minecraft = summonBot();
        client.minecraft.on("chat", (username, msg, json) => {
            const chan = client.channels.cache.get(config.chan);
            if (chan.isTextBased()) {
                chan.send({
                    embeds: [
                        new EmbedBuilder().setTitle(username).setDescription(msg).setColor("Green"),
                    ],
                });
            }
        });
        client.minecraft.on("login", async () => {
            await interaction.editReply({ content: "Connected !" });
        });

        await interaction.reply({ content: "Connecting to the server" });
    } else {
        await interaction.reply({ content: "I'm already connected !", ephemeral: true });
    }

    return;
};
