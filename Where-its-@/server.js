const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8000;
//Import Routes

const logiRoute = require('./routes/login');
const addEventAdminRouter = require('./routes/admin');
const verifyTicketStaff = require('./routes/verify');
const clientRouter = require('./routes/client');

// Middleware
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(cors());

//const initDB = require('./models/database-functions');

//Route Middlewares
app.use('/api/v1/auth', logiRoute);
app.use('/api/v1/admin',addEventAdminRouter);
app.use('/api/v1/staff',verifyTicketStaff);
app.use('/api/v1/user', clientRouter);

app.listen(port,()=> {
    //initDB.initDatabase();
    console.log(`Listening on port ${port} ...`);
});