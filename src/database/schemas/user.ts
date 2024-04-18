import mongoose, { ObjectId } from 'mongoose';

export interface User {
    id: string,
    discordId: string,
    accessToken: string,
    refreshToken: string,
}

const userSchem = new mongoose.Schema<User>({
    discordId: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true, unique: true },
    refreshToken: { type: String, required: true, unique: true },
});

export default mongoose.model('user', userSchem)