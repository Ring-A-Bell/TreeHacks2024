import * as path from 'path';
import express from 'express';
import * as url from 'url';
import * as bodyParser from 'body-parser';
const cors = require('cors');
const https = require('https');
import GooglePassport from './GooglePassport';
import session from 'express-session';
import { nanoid } from 'nanoid';

import { UserModel } from './src/models/UserModel';
import { RecipesModel } from './src/models/RecipesModel';
import { PantryModel } from './src/models/PantryModel';
import { ConsumableModel } from './src/models/ConsumableModel';
import passport from 'passport';
import OpenAIConnection from './src/openai/test_connection';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public Users: UserModel;
  public Recipes: RecipesModel;
  public Pantry: PantryModel;
  public Consumables: ConsumableModel;
  
  public express: express.Application;
  public googlePassport: GooglePassport;

  //Run configuration methods on the Express instance.
  constructor() {
    this.Users = new UserModel();
    this.Recipes = new RecipesModel();
    this.Pantry = new PantryModel();
    this.Consumables = new ConsumableModel();

    this.googlePassport = new GooglePassport();

    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors());
    this.express.use(session({ secret: "tree_hacks" }));
    this.express.use(passport.initialize());
    this.express.use(passport.session());
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get('/', (req, res, next) => {
        res.send('Express + TypeScript Server');
    });

    router.get("/login/active", (req, res) => {
        if ((req.session as any)["uuid"]) {
            console.log("Session ID: ", (req.session as any)["uuid"]);
          res.send(true);
        } else {
        console.log("Session ID false: ", (req.session as any)["uuid"]);
          res.send(null);
        }
    });

    router.get(
        "/login/federated/google",
        passport.authenticate("google", {
          scope: ["profile", "email"]
        }),
        (req, res) => {
          res.send("Successful login");
        }
    );

    router.get(
        "/login/federated/google/callback",
        (req, res, next) => {
          req.session.save();
          next();
        },
        passport.authenticate("google", {
          failureRedirect: "/#/login"
        }),
        async (req, res) => {
          console.log("Successful login");
          console.log("req info - ", req.user);
  
        const googleProfile: any = JSON.parse(JSON.stringify(req.user));
        let doesUserExist: any = await this.Users.doesUserExist(res, googleProfile.id);

        if (!doesUserExist) {
            console.log("User doesn't exist. Creating a new entry for this user in the DB");
            let newUser: any = await this.Users.createUser(
                res,
                googleProfile.id,
                googleProfile.name.givenName,
                googleProfile.name.familyName,
                googleProfile.emails[0].value,
                googleProfile.photos[0].value
            );
            console.log("New user created with ID: ", newUser);
            (req.session as any)["uuid"] = newUser;
        } else {
            console.log("User already exists, logging in...");
            (req.session as any)["uuid"] = googleProfile.id;
        }
        req.session.save();
        console.log("Session ID: ", (req.session as any)["uuid"]);
        res.redirect("/#/dashboard");
        }
      );
  

    //
    // USER ROUTES
    // 

    router.get('/users/:userID', (req, res) => {
        const id = (req.session as any)["uuid"];
        const x = this.Users.getUserDetails(res, id);
        return x;
    });

    // router.post('/users', async (req, res) => {
    //     var details = req.body;
    //     const x = await this.Users.createUser(res, details);
    //     return x;
    // });

    //
    // RECIPE ROUTES
    //

    router.get('/recipes/:id', async (req, res) => {
        const id = req.params.id;
        const x = await this.Recipes.getRecipeDetails(res, id);
        return x;
    });

    router.post('/recipes', async (req, res) => {
        var details = req.body;
        const x = await this.Recipes.createRecipe(res, details);
        return x;
    })

    //
    // PANTRY ROUTES
    //

    router.post('/pantry', async (req, res) => {
        var details = req.body;
        const x = await this.Pantry.createPantry(res, details);
        return x;
    });

    router.get('/pantry/:id', async (req, res) => {
        const id = (req.session as any)["uuid"];
        const x = await this.Pantry.getPantryDetails(res, id);
        return x;
    })

    router.put('/pantry/:id', async (req, res) => {
        const id = (req.session as any)["uuid"];
        let details = req.body.consumables;
        const x = await this.Pantry.updatePantry(res, id, details);
        return x;
    });

    //
    // CONSUMABLE ROUTES
    //

    router.get('/consumables/:name', async (req, res) => {
        const name = req.params.name;
        const x = await this.Consumables.getConsumableByName(res, name);
        return x;
    });

    router.get('/consumables/:id', async (req, res) => {
        const id = req.params.id;
        const x = await this.Consumables.getConsumableByID(res, id);
        return x;
    });

    router.post('/consumables', async (req, res) => {
        var details = req.body;
        const x = await this.Consumables.createConsumable(res, details);
        return x;
    });

    //
    // OPENAI ROUTES
    //

    router.post('/openai', async (req, res) => {
        const mainIngredient = req.body;
        const id = (req.session as any)["uuid"];
        const pantryIngredients = await this.Pantry.getPantryDetailsLocal(res, id);
        const connection = new OpenAIConnection();
        const x = await connection.main(pantryIngredients?.consumables, mainIngredient);
        console.log(x);
        res.send(x);
    });


    //
    // ROUTES CONFIG
    //

    this.express.use('/api', router);

    this.express.use('/images', express.static(__dirname+'/img'));
    this.express.use('/', express.static("public"));

    }

}

export {App};