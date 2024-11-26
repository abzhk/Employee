const express = require('express');
const userRouter = require('./userRoute'); 

const router = express.Router();

router.use('/User', userRouter); 

module.exports = router;
