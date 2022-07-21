import { DateTime } from "luxon";
import { moment } from 'moment';
import { node } from "prop-types";
const formatToLocalTime = (
    secs,
    zone,
    format = "cccc,dd LLL yyyy'| local time: 'hh:mm a"
) => 
    // DateTime.fromSeconds(secs).setZone(zone).toFormat('hh:mm a');
  {
    
    const time = new Date(secs);
    const timeZone = zone;
    const offset = time.getTime()/*dt*/ +timeZone ; 
    const dt = new Date(offset * 1000).toUTCString().slice(16, 29);
    
    
    return dt;
   } 


export {formatToLocalTime}