const ticketDEtails = document.querySelector('.single-ticket');

const getEvent = () => {
  return sessionStorage.getItem('Event');
}

const displayTicket = async (ticket) =>{

  console.log('Ticket session: ', ticket);
  ticketDEtails.innerHTML = '';
     ticketDEtails.innerHTML +=  `<ul class="event-ticket-article">
                                      <p class="event-to-order">You are about to score <br/> some tickets to</p>
                                      <li class="show-event-name">${ticket.event_name} </li>
                                      <li class="show-event-date-time">${ticket.date} ${ticket.from_time} - ${ticket.to_time} </li>
                                      <li class="show-event-place">${ticket.suite} </li>
                                      <li class="show-event-price">${ticket.ticket_price} sek </li>
                                      <button class="buyTicket" id="orderTicket"> BUY </button>
                                  </ul>`;   
    buyTicket();
}

 const getTicket = async ()=> {
  try {
        //Session Storage
        const ticket = getEvent();
        let obj = {
          event_name : ticket
        }
        console.log('My-localStorage', ticket);

        let url = `http://localhost:7000/api/v1/user/event`;
        await fetch(url,{
                          method: 'POST',
                          body: JSON.stringify(obj),
                          headers: {'Content-Type': 'application/json'}
                      }).then((response) => {
                          return response.json();
                      }).then(data => {
                        console.log('Data: ', data.event);
                          displayTicket(data.event);
                      }).catch(error => {
                          console.error('ERROR IN Post: ', error);
                      });

  } catch (error) {
    alert('Something went wrong, contact our staff! ', error);

  }
}

const buyTicket=()=>{
    const buyButton = document.querySelector('#orderTicket');
      buyButton.addEventListener('click', ()=>{
        setTimeout(()=>{
          location.href = 'http://localhost:7000/ticket.html';
        });
      });
}
getTicket();
