import * as Mongoose from 'mongoose';

interface IPantryModel extends Mongoose.Document {
    pantryID: string;
    userID: string;
    consumables: [string];
    // TODO: add equipment as well
    // equipment: [string];
}

export {IPantryModel}