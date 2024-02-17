import * as Mongoose from 'mongoose';
import {DataAccess} from '../../DataAccess';
import { IConsumableModel } from '../interfaces/IConsumableModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

(async () => {
    mongooseConnection = await mongooseObj;
});

class ConsumableModel {
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
                consumableID: String,
                name: String,
                photoURL: String,
            }, { collection: 'consumables' }
        );
    }

    public createModel = (): void => {
        this.model = mongooseConnection.model<IConsumableModel>("consumables", this.schema);
    }

    public async createConsumable(response: any, consumableDetails: any): Promise<any> {
        try {
            let result = await this.model.create([consumableDetails]);
            console.log("Entered this consumable into the DB -> '\n", result);
            return result;
        } catch(err) {
            response.send("Error creating consumable: " + err);
        }
    }

    public async doesConsumableExist(response: any, name: string): Promise<any> {
        let query = this.model.findOne({name: name});
        try {
            const queryResult = await query.exec();
            if(queryResult) {
                console.log("Data has been collected ->");
                console.log(queryResult);
                return true;
            } else {
                console.log("No data found\n", queryResult);
                return false;
            }
        } catch(err) {
            response.send("Error retrieving consumable: " + err);
        }
    }

    public async getConsumableByName(response: any, name: string): Promise<any> {
        let query = this.model.findOne({name: name});
        try {
            const queryResult = await query.exec();
            if(queryResult) {
                console.log("Data has been collected ->");
                console.log(queryResult);
                response.json(queryResult);
            } else {
                console.log("No data found\n", queryResult);
            }
        } catch(err) {
            response.send("Error retrieving consumable: " + err);
        }
    }

    public async getConsumableByID(response: any, consumableID: string): Promise<any> {
        let query = this.model.findOne({consumableID: consumableID});
        try {
            const queryResult = await query.exec();
            if(queryResult) {
                console.log("Data has been collected ->");
                console.log(queryResult);
                response.json(queryResult);
            } else {
                console.log("No data found\n", queryResult);
            }
        } catch(err) {
            response.send("Error retrieving consumable: " + err);
        }
    }
}

export { ConsumableModel }