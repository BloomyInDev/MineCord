import { RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { CustomClient } from "./types.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const registerCommands = async (client: CustomClient) => {
    try {
        const cmdList: RESTPostAPIApplicationCommandsJSONBody[] = [];
        client.commands.forEach((cmd) => cmdList.push(cmd.data.toJSON()));
        const response = await client.rest.put(Routes.applicationCommands(client.user.id), {
            body: cmdList,
        });
        return true;
    } catch (e) {
        console.error(e);
    }
    return false;
};
