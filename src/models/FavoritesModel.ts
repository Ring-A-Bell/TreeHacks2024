import * as Mongoose from 'mongoose';
import { DataAccess } from '../../DataAccess';
import { IFavoritesModel } from '../interfaces/IFavoritesModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

(async () => {
    mongooseConnection = await mongooseObj;
})

class FavoritesModel {
    public schema: Mongoose.Schema | undefined;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema = (): void => {
        this.schema = new Mongoose.Schema(
            {
                recipeID: String,
                userID: String,
            }, { collection: 'favorites' }
        );
    }

    public createModel = (): void => {
        this.model = mongooseConnection.model<IFavoritesModel>("favorites", this.schema);
    }

    public async createFavorite(response: any, details: any): Promise<any> {
        try {
            var result = await this.model.create([details]);
            console.log("Entered this favorite recipe into the DB -> '\n", result);
        } catch(err) {
            response.send("Error creating recipe: " + err);
        }
    }

}