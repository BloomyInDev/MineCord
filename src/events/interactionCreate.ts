import { Interaction, CacheType } from "discord.js";
import { CustomClient } from "../types.js";

export const interactionCreateEvent = async (interaction: Interaction<CacheType>) => {
    //let lang = await playlist.findOne({ guildID: interaction.guild.id });
    const client: CustomClient = interaction.client;
    interaction.isRoleSelectMenu();
    if (interaction.isChatInputCommand()) {
        const command = client.commands?.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: "Il y a eu une erreur à l'execution de la commande!",
                    ephemeral: true,
                });
            } else {
                await interaction.reply({
                    content: "Il y a eu une erreur à l'execution de la commande!",
                    ephemeral: true,
                });
            }
        }
    }
};
