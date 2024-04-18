import { Router } from "express";
import passport from 'passport'
const router = Router()

router.get('/discord', passport.authenticate('discord'), (rq, rs) => {
    rs.sendStatus(200)
});

router.get('/discord/redirect', passport.authenticate('discord'), (rq, rs) => {
    rs.send({ message: 'Ok Status' })
});

router.get("/status", (req, res) => {
    req.user ? res.send(req.user) : res.sendStatus(401).send({ message: "Forbidden!" })
})

export default router;