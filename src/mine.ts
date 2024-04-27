import { createBot } from "mineflayer";
import config from "./config.json" assert { type: "json" };

export const summonBot = () =>
    createBot({
        chat: "enabled",
        host: config.mc.host,
        port: config.mc.port,
        username: config.mc.pseudo,
        hideErrors: true,
        logErrors: false,
    });

// I don't like this but it's needed to not display crap
// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.trace = (...data: any[]) => {};
