const orderdTicket = document.querySelector('.ticket-code');

const getEvent = () => {
  return sessionStorage.getItem('Event');
}
async function displayTicket (ticketEvent,tickNum){

orderdTicket.innerHTML = '';
 orderdTicket.innerHTML += 
 `<section class="container-main" > 
                                <div class="div-area-1">
                                  <span class="what"> what </span>
                                  <p class="p-what">${ticketEvent.event_name}</p>
                                </div>
                                
                                <div class="div-area-2">
                                    <span class="where"> where </span>
                                    <p class="p-where">${ticketEvent.suite}</p>
                                </div>
                                <div class="div-area-3">
                                    <div class="when-info">
                                        <p class="when"> when </p>
                                        <p class="when-d"> ${ticketEvent.date} </p>
                                    </div>
                                    <div class="from-info">
                                        <p class="from">from</p>
                                        <p class="from-d">${ticketEvent.from_time}</p>
                                    </div>
                                    <div class="to-info">
                                        <p class="to">to</p>
                                        <p class="to-d">${ticketEvent.to_time}</p>
                                    </div>
                                </div>
                                <div class="div-area-4">
                                    <span class="ticket inne"> 
                                        <img class=" img" src="./assets/img/A2ED7barcode.png" alt="" width="210" height="60">
                                        <p class="code"> T-Nr: ${tickNum} </p>
                                    </span>
                                </div>
                              <section>`;
                            
}

const showTicket = async()=> {
  try {
         //Session Storage
        const ticket = getEvent();
        let obj = {
         event_name: ticket
        }
        console.log('My-localStorage', ticket)

      let url = `http://localhost:7000/api/v1/user/buyTicket`;
      await fetch(url,{
                        method: 'POST',
                        body: JSON.stringify(obj),
                        headers: {'Content-Type': 'application/json'}
                    }).then((response) => {
                        return response.json();
                    }).then(data => {
                      console.log('Data event buyTicket :',  data), //displayTicket(data.availableEvent[0])
                        displayTicket(data.availableEvent,data.ticketNumber);// displayTicket(data.availableEvent[0]);
                    }).catch(error => {
                        console.error('ERROR IN Post: ', error);
                    });


  } catch (error) {
    alert('Something went wrong', error);

  }
}

showTicket();