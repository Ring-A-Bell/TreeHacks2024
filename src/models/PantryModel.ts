import * as Mongoose from 'mongoose';
import {DataAccess} from '../../DataAccess';
import { IPantryModel } from '../interfaces/IPantryModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

(async () => {
    mongooseConnection = await mongooseObj;
});

class PantryModel {
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
                pantryID: String,
                userID: String,
                consumables: [{consumableID: String, quantity: Number, measurementUnit: String}],
            }, { collection: 'pantry' }
        );
    }

    public createModel = (): void => {
        this.model = mongooseConnection.model<IPantryModel>("pantry", this.schema);
    }

    public async createPantry(response: any, pantryDetails: any): Promise<any> {
        try {
            let result = await this.model.create([pantryDetails]);
            console.log("Entered this pantry into the DB -> '\n", result);
            return result;
        } catch(err) {
            response.send("Error creating pantry: " + err);
        }
    }

    public async getPantryDetails(response: any, userID: string): Promise<any> {
        let query = this.model.findOne({userID: userID});
        try {
            const queryResult = await query.exec();
            if(queryResult) {
                console.log("Pantry data is -> ");
                console.log(queryResult);
                response.json(queryResult);
            } else {
                response.send("No data found for that ID");
            }
        } catch(err) {
            response.send("Error retrieving pantry");
        }
    }

    public async getPantryDetailsLocal(response: any, userID: string): Promise<any> {
        let query = this.model.findOne({userID: userID});
        try {
            const queryResult = await query.exec();
            if(queryResult) {
                console.log("Pantry data is -> ");
                return queryResult;
            } else {
                response.send("No data found for that ID");
            }
        } catch(err) {
            response.send("Error retrieving pantry");
        }
    }

    public async updatePantry(response: any, userID: string, consumables: any): Promise<any> {
        try {
            let search = await this.model.findOne({userID: userID});
            console.log("Found pantry search -> '\n", search)
            console.log("new consumables -> '\n", consumables)
            const newRes = [...search.consumables, consumables.consumable];
            console.log("newRes -> '\n", newRes)
            let result = await this.model.updateOne({userID: userID}, {consumables: newRes});
            console.log("Updated pantry -> '\n", result);
            return result;
        } catch(err) {
            response.send("Error updating pantry: " + err);
        }
    }
}

export { PantryModel }