import { Router } from "express";
import AuthRouter from './auth';
import GuildRouter from './guilds'

const router = Router();

router.use('/auth', AuthRouter);
router.use('/guilds', GuildRouter);

export default router;