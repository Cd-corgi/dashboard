import { config } from "dotenv";
config();
import passport from 'passport';
import { Strategy, Profile } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';
import { UserSchema } from '../database/schemas';

passport.serializeUser((user: any, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await UserSchema.findById(id)
        return user ? done(null, user) : done(null, null);
    } catch (error) {
        console.log(error);
        done(error, null);
    }
})

passport.use(
    new Strategy({
        clientID: process.env.ID_CLIENT!,
        clientSecret: process.env.SECRET_CLIENT!,
        callbackURL: process.env.DISCORD_REDIRECT,
        scope: ['identify', 'email', 'guilds']
    }, async (accessToken: String, refreshToken: String, profile: Profile, done: VerifyCallback) => {
        try {
            const { id: discordId } = profile;
            const existingUser = await UserSchema.findOneAndUpdate({ discordId }, { accessToken, refreshToken }, { new: true });
            console.log(`Existing User ${existingUser?.discordId}`)
            if (existingUser) return done(null, existingUser);
            const newUser = new UserSchema({ discordId, accessToken, refreshToken })
            const savedUser = await newUser.save()
            return done(null, savedUser)
        } catch (error) {
            console.log(error)
            return done(error as any, undefined)
        }
    })
);

