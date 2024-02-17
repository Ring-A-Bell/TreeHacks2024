import * as Mongoose from 'mongoose';

interface IUserModel extends Mongoose.Document {
    authID: string;
    fname: string;
    lname: string;
    email: string;
    profilePic: string;
}

export {IUserModel}