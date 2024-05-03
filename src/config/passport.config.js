import passport from 'passport';
import LocalStrategy from 'passport-local';
import GitHubStrategy from 'passport-github2';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

passport.use('local-login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    authenticateUser
));

passport.use('github', new GitHubStrategy(
    {
        clientID: 'Iv1.da7d221d8710caaf',
        clientSecret: 'd958b7e285b8774c2f63f3251833861b50860575',
        callbackURL: 'http://localhost:3333/api/sessions/ProyectoBackend'
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

passport.use('current', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'clave'
}, (payload, done) => {
    User.findById(payload.id, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

export const authenticateUser = async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
};