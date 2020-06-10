const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./database/events.json');
const db = low(adapter);

module.exports = {
    initDatabase(){
        //Check if events exists...NOT Allow duplicate db...
         db.has('events').value()
                            ? (console.log(`Already have this database ...!`) )
                            : ( db.defaults({events:[],users:[],ticket:[]}).write(),
                                console.log('New DB has been created ... ') );
    },
    async adminAddEvent(name,where,when,from,to,price,number){
            let _id =1 ;
            let dbEvents = db.get('events').value();
            for (_id  ; _id < dbEvents.length +1; _id++) {
                if(_id === dbEvents[_id]){
                    _id++;
                }
            }
           let insert =  await db.get('events').push({
                                        id:_id,
                                        event_name: name,
                                        suite: where,
                                        date:when,
                                        from_time:from,
                                        to_time:to,
                                        ticket_price:parseInt(price),
                                        event_tickets_quantity:parseInt(number),
                                        sold_tickets: 0
                                    }).write();
           
     return await insert;
    },
    async allEvents(){
            return await db.get('events').value();
    },
    async getUserFromUsername(user) {//login-router
        return await db.get('users').find({ username: user.username }).value();
    },
    async addUser(uuid, pass) { // create-router
        // return await db.get('users').push({ uuid: uuid, username: 'staff', password: pass, role: 'staff' }).write();
        return await db.get('users').push({ uuid: uuid, username: 'admin', password: pass, role: 'admin' }).write();
    },
    async getUser(user) { //middleware-auth-router
        return await db.get('users').find({ uuid: user.uuid }).value();
    },
     //--**************************** Client ********************************--//
     async checkTicket(evenDetails){ //client...
     return await db.get('events').find({event_name : evenDetails.event_name}).value();
        //   return await db.get('events').filter(c=> c.event_name === evenDetails.event_name).value();
    },
    async addTicket(ticketNum, eventName){//client ...
        return await db.get('ticket').push({event_name: eventName.event_name ,ticketNumber : ticketNum}).write();
    },
    async ticketsLeft(event){ //client ...
       //return await db.get('events').find({event_name: event.name}).assign({event_tickets_quantity : event.tickets -1, sold_tickets : event.ticketsSold +1 }).write();
       let antal = parseInt(event.event_tickets_quantity);
       let salda = parseInt(event.sold_tickets);
       return await db.get('events')
                .find({event_name: event.event_name})
                .assign({event_tickets_quantity :antal-1, sold_tickets : salda+1 })
                .write();
    },



    async getEventName(eventByName){//Client
        const event = await db.get('events').find({event_name : eventByName.event_name}).value();
        return event;
    },
    async getEventByName(name){ //client
        return await db.get('events').filter(c=> c.event_name ===  name).value();
    },
    async getEventById(id){ //client
        return await db.get('events').find({id: parseInt(id)}).value();
    },
//--***********************************************************--//
    async verifyTicketNum(number){
        return await db.get('ticket').find({ticketNumber: number.ticketNumber}).value();
    },
    async deleteTicket(ticketToCancel){
        return await db.get('ticket').remove({ticketNumber: ticketToCancel.ticketNumber}).write();
    },
}