import * as Mongoose from 'mongoose';

interface IConsumableModel extends Mongoose.Document {
    consumableID: string;
    name: string;
    photoURL: string;
}

export { IConsumableModel };