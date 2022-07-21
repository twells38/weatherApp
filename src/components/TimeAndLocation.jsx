import React, { startTransition, useLayoutEffect } from "react";
import {formatToLocalTime } from "../services/WeatherService";
import { DateTime } from "luxon";

function TimeAndLocation({ data: { dt, timezone, name, country,sys,coord} }) {
    
  return (
    <div>
      <div >
        <p className="fs-6 my-1 ">
         {formatToLocalTime(dt,timezone)}
        </p>
     </div>
    </div>
  );
}
export default TimeAndLocation;

