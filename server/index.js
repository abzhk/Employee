const express = require('express');
const mongoose=require("mongoose");
const bodyparser = require('body-parser');
const cors = require('cors');
// const nodemailer = require('nodemailer')


require('dotenv').config();


const PORT = process.env.PORT || 7005; 
const MONGODB = process.env.MONGODB_URI;


const cookieParser = require('cookie-parser');

const app = express();

const route = express.Router();

app.use(cookieParser());
app.use(cors(
    {
        origin: ['http://localhost:3000',' http://localhost:3001'],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE" ],
        credentials:true,
    }
));

// Use body-parser middleware
app.use(bodyparser .json()); // Parse JSON data
app.use(bodyparser .urlencoded({ extended: true })); // Parse URL-encoded data

//PATH SETTER IN ROUTES 
const router=require('./routes/route.js');
app.use('/api',router)


// Database Connection
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((error) => console.error('Error connecting to MongoDB:', error.message));


//CHECK PORT ADDRESS AND MONGOOSE DB URL HERE :
app.listen(PORT, () => {
    console.log(`Server runs at port ${PORT}`);
    // console.log(`MongoDB URI: ${MONGODB}`);
});
