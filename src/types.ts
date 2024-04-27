import { Client, Collection, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Bot } from "mineflayer";

export interface CustomClient extends Client {
    commands?: Collection<
        string,
        {
            data: SlashCommandBuilder;
            execute: (
                client: CustomClient,
                interaction: CommandInteraction,
            ) => void | Promise<void>;
        }
    >;
    minecraft?: Bot;
}
