import axios from "axios";
import { DISCORD_URL } from "../../utils/constants";
import { config } from "dotenv";
import { PartialGuild } from "../../utils/types";
import { UserSchema } from '../../database/schemas'
config()

export function getBotGuildServices() {
    return axios.get<PartialGuild[]>(`${DISCORD_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    });
}

export async function getUserGuildServices(id: string) {
    const getUser = await UserSchema.findById(id);
    if (!getUser) throw new Error("No user found!");
    return axios.get<PartialGuild[]>(`${DISCORD_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bearer ${getUser.accessToken}`
        }
    })
}

export  async function getMutualGuildServices(id: string) {

    const { data: botGuilds } = await getBotGuildServices();
    const { data: userGuilds } = await getUserGuildServices(id);

    // Compare if the user has Administrator or ManageGuild Permission to add the bot to the guild!
    const userAdmin = userGuilds.filter(({ permissions }) => (parseInt(permissions) & 0x8) == 0x8 || (parseInt(permissions) & 0x20) == 0x20)
    return userAdmin.filter((guild) => botGuilds.some((v) => v.id === guild.id));
}