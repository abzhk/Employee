const express = require('express');
const { registerUser,
    getUser,
    loginUser,
    empdetail
 } = require('../controller/usercontroller.js');
const verifyToken = require('../middleware/authMiddleware.js')

const router = express.Router();

router.post('/register', registerUser); // Only /register is defined here
router.post('/profile',verifyToken,getUser)
router.post('/userlog',loginUser);
router.get('/viewemployee/:id',verifyToken,empdetail)

module.exports = router;
