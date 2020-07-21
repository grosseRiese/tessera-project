const { Router } = require('express');
const router = new Router();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const { addUser,getUserFromUsername } = require('../models/database-functions');
const {matchPassword,hashPassword } = require('../models/hashPassword')


router.post('/login', async (req, res) => {

    const body = req.body;
    console.log(body);

    let resObj = {
        success: false
    }
    const user = await getUserFromUsername(body);
    console.log(user);

   
        const isAMatch = await matchPassword(body.password, user.password);
        console.log('isAMatch: ', isAMatch);
        if (user && isAMatch) {
            // create and assign a token
            const token = jwt.sign({ uuid: user.uuid }, process.env.TOKEN_SECRET, {
                expiresIn: 1365000 //Expires in 6h
            });
            resObj.success = true;
            resObj.token = token;
            resObj.role = user.role;
        }
        res.send(JSON.stringify(resObj));
      
});

router.get('/isLoggedin', async(req,res) =>{
    const token = req.header('auth-token').replace('Bearer ', '');

    console.log('token isLoggedin', token);
    let resObj = {
      isLoggedinIn : false
    }

    if (token !== 'null'){
        const user = jwt.verify(token, process.env.TOKEN_SECRET);

      if (user){
        resObj.isLoggedIn = true;
        resObj.user = user;
      }

    }
    res.send(JSON.stringify(resObj));
  });

//Register route to create acount [for developers ]
router.post('/register', async (req, res) => {
    
    let body = req.body;
    let resObj = {
        success: false
    }
    //Hash password
    const passwordHash = await hashPassword(body.password);
    console.log(passwordHash);

    const uuid = uuidv4();
    // const userCreated = await addUser(uuid, body.username, passwordHash); body-username: is was set i db already!
    const userCreated = await addUser(uuid,passwordHash);

    if (userCreated) {
        const token = jwt.sign({ id: uuid }, process.env.TOKEN_SECRET, {
            expiresIn: 1365000 //Token expires in 6h min
        });
        resObj.success = true;
        resObj.token = token;
    }
    res.send(JSON.stringify(resObj));
});

module.exports = router;