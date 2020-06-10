const ticketNum = document.querySelector('#ticket-number');
const checkTicket = document.querySelector('#verify-ticket');
const eventName = document.querySelector('#name-event');
const ticketCode = document.querySelector('#ticket-code');
const respTicket = document.querySelector('.response');

const getToken =() => {
  return sessionStorage.getItem('auth');
}

if(!getToken()){
  console.log('Access denied !');
    setTimeout(()=>{
      location.href = 'http://localhost:7000/index.html';
  },0);
}

const ticketToCheck = async (ticket)=>{
  try {
    const url = 'http://localhost:7000/api/v1/staff/ticket';
    const response = await fetch(url, {
      method: 'POST',
      body:JSON.stringify(ticket),
      headers: {'content-Type': 'application/json',
                'auth-token': 'Bearer ' + getToken()
              }
      });
      const data = await response.json();
        console.log('Data Verify: ', data);
    return await data;
  } catch (error) {
     console.log('Server problem',error);
  }
}


checkTicket.addEventListener('click', async()=> {
  
  let obj = {
    ticketNumber : ticketNum.value
  }
  const ticket = await ticketToCheck(obj);
  console.log('ticket', ticket);
 
  if (ticket.success){
    respTicket.innerHTML = '';
      respTicket.innerHTML += `<br><div style="text-align: center;margin-top:0.5rem;">
                                  <span id="name-event" class="resp">Event: ${ticket.event}</span><br>
                                  <span id="ticket-code" class="resp">Verified: ${ticket.ticket}</span>
                                </div>`;
  } else {
    respTicket.innerHTML = '';
    respTicket.innerHTML += `<br><br><div style="text-align: center;margin-top:0.5rem;">
                                <span id="name-event" class="resp">Event: ${ticket.message}</span><br>
                                <span id="ticket-code" class="resp">Not Verified: ${ticket.ticket}</span>
                              </div>`;
  }
  resetTickNum();
});

const resetTickNum =()=> {
  ticketNum.value = '';
}

const buttonElem = document.querySelector('#logout');
function logout() {
    sessionStorage.removeItem('auth');
    location.href = '/';
}
buttonElem.addEventListener('click', () => {
    logout();
});