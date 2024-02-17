import * as path from 'path';
import express from 'express';
import * as url from 'url';
import * as bodyParser from 'body-parser';

import { UserModel } from './src/models/UserModel';
import { RecipesModel } from './src/models/RecipesModel';
import { PantryModel } from './src/models/PantryModel';}

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public Users: UserModel;
  public Recipes: RecipesModel;
  public Pantry: PantryModel;
  
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.Users = new UserModel();
    this.Recipes = new RecipesModel();
    this.Pantry = new PantryModel();

    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get('/', (req, res, next) => {
        res.send('Express + TypeScript Server');
    });

    //
    // USER ROUTES
    // 

    router.get('/users/:userID', (req, res) => {
        const id = req.params.userID;
        const x = this.Users.getUserDetails(res, id);
        return x;
    });

    router.post('/users', async (req, res) => {
        var details = req.body;
        const x = await this.Users.createUser(res, details);
        return x;
    });

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
        const id = req.params.id;
        const x = await this.Pantry.getPantryDetails(res, id);
        return x;
    })


    //
    // ROUTES CONFIG
    //

    this.express.use('/api', router);

    this.express.use('/images', express.static(__dirname+'/img'));
    this.express.use('/', express.static(__dirname+'/pages'));

    }

}

export {App};