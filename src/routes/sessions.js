import { Router } from 'express';
import passport from 'passport';
export const router=Router()

router.get('/github', passport.authenticate("github", {}), (req,res)=>{})
router.get('/callbackGithub', passport.authenticate("github", {}), (req,res)=>{})

    res.setHeader('Content-Type','application/json')
    return res.status(200).json({playload:"ok"});