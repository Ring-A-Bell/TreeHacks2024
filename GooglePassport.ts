import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

class GooglePassport {
  constructor() {
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CALLBACK_URL) {
      passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
          },
          (accessToken: any, refreshToken: any, profile: any, done: any) => {
            done(null, profile);
          }
        )
      );

      passport.serializeUser((user: any, done: any) => {
        done(null, user);
      });

      passport.deserializeUser((user: any, done: any) => {
        done(null, user);
      });
    }
  }
}

export default GooglePassport;