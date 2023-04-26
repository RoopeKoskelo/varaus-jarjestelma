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

  let EVENTS: ProcessedEvent[] = [await fetch("http://localhost:5000/reservations").then((res) => res.json())]

    console.log({ query });
    /**Simulate fetchin remote data */
    //await fetch("http://localhost:5000/reservations")
    //.then((res) => res.json())
    //.then((res) => EVENTS)
    console.log(EVENTS)
  
    return new Promise((res) => {
      setTimeout(() => {
        res(EVENTS);
      }, 3000);
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
    return new Promise((res, rej) => {
      if (action === "edit") {
        /** PUT event to remote DB */
      } else if (action === "create") {
        /**POST event to remote DB */
      } 
      
      res({...event, event_id: event.event_id || Math.random()});     
    });
    
  };

  const handleDelete = async (deletedId: string): Promise<string> => {
    // Simulate http request: return the deleted id
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(deletedId);
      }, 3000);
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
            disableViewNavigator={true}
            getRemoteEvents={fetchRemote}
            onConfirm={handleConfirm}
            onDelete={handleDelete}
        />
      </Box>
    </div>
  );
}

