import React from 'react';
import { Box } from '@mui/material'
import { useState, useEffect } from 'react';
import {
  EventActions,
  ProcessedEvent,
  ViewEvent
} from "@aldabil/react-scheduler/types";
import { Scheduler } from '@aldabil/react-scheduler';
//import { EVENTS } from './events';

export default function App() {

  const fetchRemote = async (query: ViewEvent): Promise<ProcessedEvent[]> => {
    async function fetchReservations(){
      const data = await fetch("http://localhost:5000/reservations").then((res) => res.json())
      
      const newDates = data.map((data: any) => ({
        event_id: data.event_id,
        title: data.title,
        start: new Date(data.start),
        end: new Date(data.end)
      }))
      
      return newDates
    }

    const EVENTS: ProcessedEvent[] = await fetchReservations()

    console.log({ query });
    /**Simulate fetchin remote data */
    //await fetch("http://localhost:5000/reservations")
    //.then((res) => res.json())
    //.then((res) => EVENTS)
    console.log(EVENTS)
  
    return new Promise((res) => {
      setTimeout(() => {
        res(EVENTS);
      }, 1000);
    });
  };

  const handleConfirm = async (
    event: ProcessedEvent,
    action: EventActions
  ): Promise<ProcessedEvent> => {
    console.log("handleConfirm =", action, event.title);

    /**
     * Make sure to return 4 mandatory fields:
     * event_id: string|number
     * title: string
     * start: Date|string
     * end: Date|string
     * ....extra other fields depend on your custom fields/editor properties
     */
    // Simulate http request: return added/edited event
    let data = ({
      event_id: event.event_id, // muuttuu heti backendissä joten ei merkitse mitään, mutta scheduleri vaatii jotain siihen
      title: event.title,
      start: event.start,
      end: event.end
    })
    console.log(data)
    return new Promise((res, rej) => {
      if (action === "edit") {
        /** PUT event to remote DB */
        fetch("http://localhost:5000/reservations", {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        console.log(event.event_id)
        
      } else if (action === "create") {
        /**POST event to remote DB */
        fetch("http://localhost:5000/reservations", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
      } 
      res({...event, event_id: event.event_id || Math.random(),
        title: event.title,
        start: event.start,
        end: event.end
      });     
    });
    
  };

  const handleDelete = async (deletedId: string): Promise<string> => {
    // Simulate http request: return the deleted id
    await fetch('http://localhost:5000/reservations/' + deletedId, { method: 'DELETE' })
    .then((res) => res.json())

    console.log(deletedId)

    return new Promise((res, rej) => {
      setTimeout(() => {
        res(deletedId);
      }, 1000);
    });
  };
  
  return (
    <div className="App">
      <Box sx={{
        padding: '10%'
      }}>
        <Scheduler
            view="week"

            week={{ 
                weekDays: [0, 1, 2, 3, 4], 
                weekStartOn: 1, 
                startHour: 8, 
                endHour: 16,
                step: 30,
                navigation: true,
            }}
            day={{
                startHour: 8, 
                endHour: 16,
                step: 30,
                navigation: true,
            }}
            hourFormat={"24"}
            disableViewNavigator={true}
            getRemoteEvents={fetchRemote}
            onConfirm={handleConfirm}
            onDelete={handleDelete}
        />
      </Box>
    </div>
  );
}

