import { Router } from "express";
import { isAuthenticated } from "../../utils/middlewre";
import { getGuildsController } from "../../controllers/guilds";
const router = Router();

router.get("/", isAuthenticated, getGuildsController, (req, res) => { res.sendStatus(200) })

export default router