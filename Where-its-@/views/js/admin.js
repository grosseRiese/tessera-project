const inputName = document.querySelector('#inputName');      
const inputWhere = document.querySelector('#inputWhere');  
const inputDate = document.querySelector('#inputDate');       
const inputFrom = document.querySelector('#inputFrome');  
const inputTo = document.querySelector('#inputTo');      
const inputPrice = document.querySelector('#inputPrice');        
const inputTickets = document.querySelector('#inputTickets');     
const addEventBtn = document.querySelector('#addEventBtn');   
const eventElem = document.querySelector('#events'); 

const getToken =() => {
  return sessionStorage.getItem('auth');
}

async function displayAllEvents (events){
  console.log('all : ',events);
  eventElem.innerHTML += `<tr>`;
  for(event of events) {
   // const{ event_name, suite, event_tickets_quantity, sold_tickets } = event;

        console.log('Obj', event);
        eventElem.innerHTML += `<td>${event.event_name}</td>
                                <td>${event.suite}</td>
                                <td>${event.event_tickets_quantity}</td> 
                                <td>${event.sold_tickets}</td></tr>`;
 // for(event of events){    

 };
}

const allEvents = async()=>{
  eventElem.innerHTML = '';
  try {
        const url = 'http://localhost:7000/api/v1/admin/getEvents';
        const response = await fetch(url, {
             method: 'GET',
             headers: {
                        'auth-token': 'Bearer ' + getToken()
                    }
            });
            const data = await response.json();
            console.log('All the event',data);
            displayAllEvents(data);
            console.log('data : ', data);

            if(!getToken()){
                setTimeout(()=>{
                  location.href = 'http://localhost:7000/index.html';
              },100);
            }

    return await data;
    
  } catch (error) {
    console.log('Server POWw', error);
  }
}

const createEvent = async(event) => {
  try {
        const url = 'http://localhost:7000/api/v1/admin/addEvent';
        const response = await fetch(url, { 
                        method: 'POST', 
                        body: JSON.stringify(event),
                        headers: { 'Content-Type': 'application/json',
                            'auth-token': 'Bearer ' + getToken()
                    } 
                });
            const data = await response.json();
            allEvents();
        return await data;
  } catch (error) {
    console.log('Server ERROR', error);
  }
}

addEventBtn.addEventListener('click', () => {
  let obj = {
        event_name             : inputName.value,
        suite                  : inputWhere.value,
        date                   : inputDate.value,
        from_time              : inputFrom.value,
        to_time                : inputTo.value,
        ticket_price           : inputPrice.value,
        event_tickets_quantity : inputTickets.value
  }
  createEvent(obj);
  resetInputs();
});
allEvents();

const resetInputs =()=> {
    inputName.value = '';
    inputWhere.value = '';
    inputDate.value = '';
    inputFrom.value = '';
    inputTo.value = '';
    inputTickets.value = '';
    inputPrice.value = '';
}
const buttonElem = document.querySelector('#logout');
function logout() {
    sessionStorage.removeItem('auth');
    location.href = '/';
}
buttonElem.addEventListener('click', () => {
    logout();
});