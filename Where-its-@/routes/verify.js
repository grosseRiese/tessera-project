const {Router} = require('express');
const router = new Router();
const {verifyTicketNum, deleteTicket} = require('../models/database-functions');
const { staff } = require('../middleware/authMiddleware');

router.post('/ticket',staff, async(req,res) =>{
  ticketNum = req.body;
  console.log('TicketNum : ', ticketNum);

  let resObj = {
      success : false
    }

  let isVerified = await verifyTicketNum(ticketNum);
  console.log('isVerified', isVerified);
    if (typeof isVerified !== 'undefined'){
            resObj.success = true;
            resObj.message=  'Is verify';
            resObj.event =  isVerified.event_name;
            resObj.ticket = isVerified.ticketNumber;
            deleteTicket(isVerified);
    }else{
          resObj.message = `Ticket code is not correct!`;
          resObj.success = false;
          resObj.ticket = ticketNum.ticketNumber;
       
    }
  res.send(JSON.stringify(resObj));
});

module.exports = router;