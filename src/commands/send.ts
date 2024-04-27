import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { CustomClient } from "../types.js";

export const data = new SlashCommandBuilder()
    .setName("send")
    .setDescription("Send a message to the server")
    .addStringOption((opt) =>
        opt.setName("message").setDescription("What message to send").setRequired(true),
    );

export const execute = async (client: CustomClient, interaction: CommandInteraction) => {
    if (client.minecraft == undefined) {
        await interaction.reply({ content: "You aren't connected to the server", ephemeral: true });
        return;
    }
    const msg = interaction.options.get("message", true).value as string;
    client.minecraft.chat(msg);
    await interaction.reply({ content: "Done", ephemeral: true });
    return;
};
