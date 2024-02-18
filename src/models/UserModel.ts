import * as Mongoose from 'mongoose';
import {DataAccess} from '../../DataAccess';
import {IUserModel} from '../interfaces/IUserModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

(async () => {
    mongooseConnection = await mongooseObj;
});

class UserModel {
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
                authID: { type: String, required: true },
                fname: String,
                lname: String,
                email: String,
                profilePic: String
            }, { collection: 'user' }
        );
    }

    public createModel = (): void => {
        this.model = mongooseConnection.model<IUserModel>("user", this.schema);
    }

    public async createUser(response: any, authID: string, fname: string, lname: string, email: string, profilePic: string): Promise<any> {
        try {
            let result = await this.model.create([{authID: authID, fname: fname, lname: lname, email: email, profilePic: profilePic}]);
            console.log("Entered this user into the DB -> '\n", result);
            return result;
        } catch(err) {
            response.send("Error creating recipe: " + err);
        }
    }

    public async doesUserExist(response: any, authID: string): Promise<any> {
        let query = this.model.findOne({authID: authID});
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
            response.send("Error retrieving recipe: " + err);
        }
    }

    public async getUserDetails(response: any, userID: string): Promise<any> {
        let query = this.model.findOne({userID: userID});
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