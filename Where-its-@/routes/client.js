const {Router} = require('express');
const router = new Router();
const {allEvents, getEventByName, checkTicket, addTicket, ticketsLeft,getEventName} = require('../models/database-functions');
const {genereteTicket} = require('../models/hashPassword');

router.get('/getAllEvents', async (req,res)=>{
       let resObj = {
            success: false
        }
        const events = await allEvents();
        console.log(events);
        resObj ={
            success : true,
            events : events
        }
    res.send(JSON.stringify(resObj));
});

router.post('/event', async (req,res) =>{
    let nameEvent = req.body;
        console.log('Eventname', nameEvent);
    
        let resObj = {
            success : false
        }
        const event = await getEventName(nameEvent);
            resObj = {
                success : true,
                event   : event
            }
        
    res.send(JSON.stringify(resObj));
});

router.post('/buyTicket', async (req,res)=>{
    let infoEvent = req.body;
    console.log('Event Info',infoEvent);

    let resObj = {
      success : false
    }

    let availableEvent = await checkTicket(infoEvent);
    console.log('db is available', availableEvent);

    if (availableEvent.event_tickets_quantity !== 0){
           let ticketNum = await genereteTicket();
           let addedTicket =  await addTicket(ticketNum, availableEvent);
            console.log('Ticket added to db', addedTicket);
            
           let left = await ticketsLeft(availableEvent);
            console.log('Ticket ordered', left);
            resObj = {
                availableEvent   : availableEvent,
                ticketNumber     : ticketNum 
            }
    } else {
        resObj.message = 'Ticket available = ' + availableEvent.event_tickets_quantity;
    }
    res.send(JSON.stringify(resObj));
});


module.exports = router;