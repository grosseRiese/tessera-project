const jwt = require('jsonwebtoken');
const { getUser } = require('../models/database-functions');

module.exports = {
    //STAFF mw-section
    async staff(req, res, next) {
        try {
            const token = req.header('auth-token').replace('Bearer ', '');
            if(!token) return res.status(401).send('Access Denied');
            console.log('TOKEN: ', token);

            const data = jwt.verify(token, process.env.TOKEN_SECRET);
            console.log('Data from -staff- jwt.verify ', data);

            const user = await getUser(data);
            console.log('User from database: ', user);
            
            req.staff = user;
            console.log('Before next function');

            next(); 
        } catch (error) {
            res.status(401).send(JSON.stringify({ success: false, error: 'Token not valid' }));
        }
    },
    //ADMIN mw-section
    async admin(req, res, next) {
        try {
            const token = req.header('auth-token').replace('Bearer ', '');
            if(!token) return res.status(401).send('Access Denied');
            console.log('TOKEN: ', token);
            

            const data = jwt.verify(token, process.env.TOKEN_SECRET);
            console.log('Data from -admin- jwt.verify ', data);

            const user = await getUser(data);
            console.log('Before next function');
            console.log('User from database: ', user);

            if(user.role !== 'admin') {
                throw new Error();
            }

            req.admin = user;
            next();

        } catch (error) {
            res.status(401).send(JSON.stringify({ success: false, error: 'Token not valid' }));
        }
    }
}