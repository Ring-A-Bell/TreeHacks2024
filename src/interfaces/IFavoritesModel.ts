import * as Mongoose from 'mongoose';

interface IFavoritesModel extends Mongoose.Document {
    recipeID: string;
    userID: string;
}

export {IFavoritesModel}