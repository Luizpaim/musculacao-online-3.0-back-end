const express = require("express");
const { verifyJWT } = require("../../middleware/jwtVerify");
const router = express.Router();


const authController = require("../controllers/authController");


router.post('', authController.auth);
router.post('/renew', verifyJWT, authController.renew);

module.exports = router;