import { Request, Response } from "express";
import { getBotGuildServices, getMutualGuildServices, getUserGuildServices } from "../../services/guilds";
import { User } from "../../database/schemas/user";

export async function getGuildsController(req: Request, res: Response) {
    const user = req.user as User
    try {
        const guilds = await getMutualGuildServices(user.id);
        res.send(guilds);
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}