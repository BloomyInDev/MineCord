import { CustomClient } from "../types.js";
import { registerCommands } from "../utils.js";

export const readyEvent = (client: CustomClient) => {
    console.log(`Logged id as ${client.user.username}`);
    if (registerCommands(client)) console.log("Registered commands");
};
