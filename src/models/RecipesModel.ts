import * as Mongoose from 'mongoose';
import {DataAccess} from '../../DataAccess';
import { IRecipesModel } from '../interfaces/IRecipesModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

(async () => {
    mongooseConnection = await mongooseObj;
})

class RecipesModel {
    public schema: Mongoose.Schema | undefined;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    // Due to a quirk of typescript, the schema has to be manually defined both here and in IUserModel.ts
    public createSchema = (): void => {
        this.schema = new Mongoose.Schema(
            {
                recipeID: String,
                description: String,
                consumables: [String],
            }, { collection: 'recipes' }
        );
    }

    public createModel = (): void => {
        this.model = mongooseConnection.model<IRecipesModel>("recipes", this.schema);
    }

    public async createRecipe(response: any, recipeDetails: any): Promise<any> {
        try {
            var result = await this.model.create([recipeDetails]);
            console.log("Entered this recipe into the DB -> '\n", result);
        } catch(err) {
            response.send("Error creating recipe: " + err);
        }
    }

    public async getRecipeDetails(response: any, recipeID: string): Promise<any> {
        let query = this.model.findOne({recipeID: recipeID});
        try {
            const queryResult = await query.exec();
            if(queryResult) {
                console.log("Recipe data is -> ");
                console.log(queryResult);
                response.json(queryResult);
            } else {
                response.send("No data found for that ID");
            }
        } catch(err) {
            response.send("Error retrieving recipe");
        }
    }
}

export { RecipesModel }