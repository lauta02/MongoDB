import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';

export class PassportStrategies {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.initializeStrategies();
  }

  initializeStrategies = () => {
    passport.use(
      'local-login',
      new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, this.localLoginStrategy)
    );

    passport.use(
      'github',
      new GithubStrategy(
        {
          clientID: 'Iv1.da7d221d8710caaf',
          clientSecret: 'd958b7e285b8774c2f63f3251833861b50860575',
          callbackURL: 'http://localhost:3333/api/sessions/ProyectoBackend',
        },
        this.githubStrategy
      )
    );

    passport.use(
      'jwt',
      new JWTStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: 'clave',
        },
        this.jwtStrategy
      )
    );

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await this.userRepository.findById(id);
        done(null, user);
      } catch (error) {
        done(error);
      }
    });
  };

  localLoginStrategy = async (email, password, done) => {
    try {
      const user = await this.userRepository.findOne({ email: email });
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

  githubStrategy = async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await this.userRepository.findOne({ email: profile.emails[0].value });
      if (!user) {
        user = new this.userRepository({
          first_name: profile.displayName,
          email: profile.emails[0].value,
        });
        await user.save();
      }
      done(null, user);
    } catch (error) {
      return done(error);
    }
  };

  jwtStrategy = async (payload, done) => {
    try {
      const user = await this.userRepository.findById(payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  };
}