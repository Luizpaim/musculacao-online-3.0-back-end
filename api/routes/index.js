const express = require("express");
const router = express.Router();

//rota authentication
const authRouter = require('./authRouter');
router.use('/auth', authRouter);

//rotas users
const userRouter = require('./usersRouter');
router.use('/users', userRouter);

//rotas profiles
const profileRouter = require('./profilesRouter');
router.use('/profiles', profileRouter);

module.exports = router;