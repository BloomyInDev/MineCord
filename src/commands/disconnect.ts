import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CustomClient } from "../types.js";
import { summonBot } from "../mine.js";
import config from "../config.json" assert { type: "json" };

export const data = new SlashCommandBuilder()
    .setName("disconnect")
    .setDescription("Disconnect from the server");

export const execute = async (client: CustomClient, interaction: CommandInteraction) => {
    if (client.minecraft != undefined) {
        client.minecraft.removeAllListeners("chat");
        client.minecraft.quit("Stop");
        await interaction.reply({ content: "Disconnected" });
    } else {
        await interaction.reply({ content: "I'm not connected !", ephemeral: true });
    }

    return;
};
