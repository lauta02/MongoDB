import passport from "passport" 
import github from "passport-github2"

export const initPassport=()=>{
    
    passport.use("github", new github.Strategy(
        {
            clientID:"Iv1.da7d221d8710caaf",
            clientSecret:"d958b7e285b8774c2f63f3251833861b50860575", 
            callbackURL:"http://localhost:3333/api/sessions/ProyectoBackend"
        },
        async(accessToken, refreshToken, profile, done)=>{
            try {
                console.log(profile)
            } catch (error) {
                return done(error)
            }
        }
    ))
}

    passport.serializeUser((usuario, done)=>{
        done(null, usuario)
    }
    
    passport.deserializeUser((usuario, done)=>{
        done(null, usuario)
    }