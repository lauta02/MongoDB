const express = require('express');
const passport = require('passport');
const RouterClass = require('./RouterClass');
const userController = require('../controllers/users.controller');
const { generateToken } = require('../utils/jwt');
const uploader = require('../utils/multer');

const authenticateJWT = passport.authenticate('current', { session: false });
const authenticateGithub = passport.authenticate('github', { session: false });

class SessionRouter extends RouterClass {
    init() {
        const router = express.Router();

        router.get('/', authenticateJWT, async (req, res) => {
            try {
                const users = await userController.getAllUsers(req, res);
                res.status(200).json(users);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.get('/current', authenticateJWT, async (req, res) => {
            try {
                const currentUser = await userController.getCurrentUserInfo(req, res);
                res.status(200).json(currentUser);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.post('/register', async (req, res, next) => {
            try {
                const newUser = await userController.registerUser(req, res, next);
                res.status(201).json(newUser);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.post('/login', async (req, res) => {
            try {
                const token = await userController.loginUser(req, res);
                res.status(200).json({ token });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.get('/logout', async (req, res) => {
            try {
                const result = await userController.logoutUser(req, res);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.post('/recoverpassword', async (req, res) => {
            try {
                const result = await userController.recoverPassword(req, res);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.post('/updatepassword', async (req, res) => {
            try {
                const result = await userController.updatePassword(req, res);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.get('/premium/:uid', authenticateJWT, async (req, res) => {
            try {
                const premiumInfo = await userController.getPremiumInfo(req, res);
                res.status(200).json(premiumInfo);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.post('/:uid/documents', authenticateJWT, uploader.fields([
            { name: 'identification', maxCount: 1 },
            { name: 'addressProof', maxCount: 1 },
            { name: 'accountStatement', maxCount: 1 },
            { name: 'profile', maxCount: 1 }
        ]), async (req, res) => {
            try {
                const result = await userController.uploadDocuments(req, res);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.delete('/', authenticateJWT, async (req, res) => {
            try {
                const result = await userController.deactivateUsers(req, res);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.get('/github', authenticateGithub);

        router.get('/githubcallback', authenticateGithub, async (req, res) => {
            try {
                const user = req.user;
                const token = generateToken(user);
                res.cookie(process.env.JWT_COOKIE_KEY, token, { maxAge: 3600000, httpOnly: false, sameSite: 'none', secure: true });
                res.redirect('/products');
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        this.router = router;
    }
}

module.exports = SessionRouter;