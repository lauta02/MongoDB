import passport from "passport"; 
import github from "passport-github2";
import User from "../models/User"; 

export const initPassport = () => {
    passport.use("github", new github.Strategy(
        {
            clientID: "Iv1.da7d221d8710caaf",
            clientSecret: "d958b7e285b8774c2f63f3251833861b50860575", 
            callbackURL: "http://localhost:3333/api/sessions/ProyectoBackend"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ email: profile.emails[0].value });
                if (!user) {
                    user = new User({
                        first_name: profile.displayName,
                        email: profile.emails[0].value,
                    });
                    await user.save();
                }
                done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));
};

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id); 
        done(null, user);
    } catch (error) {
        return done(error);
    }
});