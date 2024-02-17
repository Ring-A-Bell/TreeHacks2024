import * as Mongoose from 'mongoose';

interface IRecipesModel extends Mongoose.Document {
    recipeID: string;
    description: string;
    consumables: [string];
    // TODO: add equipment stuff
    // equipment: [{
    //     equipmentID: string;
    // }]
}

export {IRecipesModel}