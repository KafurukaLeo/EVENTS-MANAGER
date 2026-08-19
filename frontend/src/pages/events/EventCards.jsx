import {CalendarDays, MapPin}  from "lucide react";

import {Link} from "react-router-dom";

const eventCards = ({event})  =>{
    return(
        <div className="event-Cards">
            <h3>{event.title}</h3>
            <p>
                <CarendarDays size ={16}/>
                { new date(event.event_date).tolocaleDateString()}
            </p>

            <p>
             <MapPin size ={16}/>
             {event.location || "No location"}
                </p>

                <link to = {`/events/${event.id}`}>
                view Event 
                </link>
        </div>
    );
}

export default eventCards;
