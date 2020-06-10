const eventsInTbl = document.querySelector('.eventsTbl');

const saveEvent = (nameEvent)=>{
  return sessionStorage.setItem('Event', nameEvent);
}

  const displayAllEvents =  async (events)=> {

    eventsInTbl.innerHTML = '';
    events.forEach(element=>{
        eventsInTbl.innerHTML += `<tr class="choosen" value="${element.event_name}" id="name">
                                        <td>
                                            <div class="event-date">`+ ` ${element.date} ` +`</div>
                                        </td>
                                        <td class="event-desc text-center" value="${element.event_name}" id="name">
                                            <i class="event-name">`+` ${element.event_name} `+`</i><br>
                                            <i class="event-place">`+` ${element.suite} `+`</i><br>
                                            <i class="event-time">`+` ${element.from_time}-${element.to_time} `+`</i>
                                        </td>
                                        <td class="pull-right event-price"> <br>`+` ${element.ticket_price} `+`<i> sek</i> 
                                        </td>
                                </tr>`;
       
                    console.log('inside method here');
    });
  
     getNameAsEvent();
};

const getEvent = async ()=> {
    try {
        let url = 'http://localhost:7000/api/v1/user/getAllEvents';
        await fetch(url, { method: 'GET' })
                .then(response => response.json())
                .then(data => {displayAllEvents(data.events),console.log('Data fetch: ',data.events) })
                .catch(err => err.message);
    } catch (error) {
        alert('Something went wrong', error);
    }
}
getEvent();

const getNameAsEvent=()=>{
   let nameEvents = document.querySelectorAll('.choosen');

   nameEvents.forEach(element =>{
        element.addEventListener('click',async()=>{
            console.log(element.getAttribute('value'));
            let nameEvent = element.getAttribute('value');
            console.log(nameEvent);
            saveEvent(nameEvent);
            setTimeout(()=>{
                location.href = 'http://localhost:7000/displayTicket.html'},1000);
        });
   });

}