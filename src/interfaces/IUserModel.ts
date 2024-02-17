import * as Mongoose from 'mongoose';

interface IUserModel extends Mongoose.Document {
    authID: String,
    userID: String;
    name: string;
    email: string;
    premiumStatus: Enumerator;
    profilePic: string;
}

export {IUserModel}