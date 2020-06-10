const { Router } = require('express');
const router = new Router();
const{ allEvents,adminAddEvent} = require('../models/database-functions');
const { admin } = require('../middleware/authMiddleware');

router.get('/admin', admin, (req, res) => {
    res.send(JSON.stringify({ success: true, message: 'Admin account!'}));
});

router.get('/getEvents', admin, async (req, res) => {
    console.log('----------------------');
    console.log('Req admin --- : ',req.admin);
    let resObj = {
        user: req.admin.username,
        role: req.admin.role,
        success: true
    }
    
    const evntsTbl = await allEvents(resObj);
    console.log('get Events', evntsTbl);
    res.status(200).send(JSON.stringify(evntsTbl ));

});

 router.post('/addEvent', admin , async (req, res) => {

    try {
            let responseSuccess = {
                Success:true,
                message: 'A event has been added'
            }
            let responseError = {
                Status: 'Failed!',
                message: 'Cann\'t add this!'
            }
            let resObj = {
                success: false
            }

            const event = req.body;
            const eventCreated = await adminAddEvent(
             resObj.event_name             = event.event_name, 
             resObj.suite                  = event.suite,
             resObj.date                   = event.date,
             resObj.from_time              = event.from_time,
             resObj.to_time                = event.to_time,
             resObj.ticket_price           = event.ticket_price,
             resObj.event_tickets_quantity = event.event_tickets_quantity/* */
            );

            if(!eventCreated) return res.status(400).send(JSON.stringify(responseError));

            if(eventCreated) {
                resObj = {
                    success                :  true,
                    eventCreated           :  eventCreated,
                    event_name             :  event.event_name ,
                    suite                  :  event.suite,
                    date                   :   event.date,
                    from_time              :  event.from_time,
                    to_time                :  event.to_time,
                    ticket_price           :  event.ticket_price,
                    event_tickets_quantity :  event.event_tickets_quantity,
                }
               console.log('Everything is OK ',resObj);
               res.send(JSON.stringify({ success: true, message: 'Is admin' }));
               //res.send(JSON.stringify(responseSuccess));
            }

        } catch (err) {
            res.status(500).send(JSON.stringify(('Intern Server Fel'),{err} ));  
        }
});
module.exports = router;