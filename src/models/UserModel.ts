import * as Mongoose from 'mongoose';
import {DataAccess} from './../DataAccess';
import {IUserModel} from '../interfaces/IUserModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

(async () => {
    mongooseConnection = await mongooseObj;
})

class UserModel {
    public schema: Mongoose.Schema;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    // Due to a quirk of typescript, the schema has to be manually defined both here and in IUserModel.ts
    public createSchema = (): void => {
        this.schema = new Mongoose.Schema(
            {
                authID: { type: String, required: true },
                userID: { type: String, required: true }, 
                name: String,
                email: String,
                premiumStatus: {
                    type: String,
                    required: true,
                    default: "false"
                },
                profilePic: String
            }, { collection: 'user' }
        );
    }

    public createModel = (): void => {
        this.model = mongooseConnection.model<IUserModel>("user", this.schema);
    }

    public async createUser(response: any, userDetails: any): Promise<any> {
        try {
            var result = await this.model.create([userDetails]);
            console.log("Entered this user into the DB -> '\n", result);
        } catch(err) {
            response.send("Error creating recipe: " + err);
        }
    }

    public async doesUserExist(response: any, authID: string): Promise<any> {
        var query = this.model.findOne({authID: authID});
        try {
            const queryResult = await query.exec();
            if(queryResult) {
                console.log("Data has been collected ->");
                console.log(queryResult);
                return queryResult;
            } else {
                console.log("No data found\n", queryResult);
                return 0;
            }
        } catch(err) {
            response.send("Error retrieving recipe: " + err);
        }
    }

    public async getUserDetails(response: any, userID: string): Promise<any> {
        var query = this.model.findOne({userID: userID});
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
            response.send("Error retrieving recipe: " + err);
        }
    }
}

export{UserModel}