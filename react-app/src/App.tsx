import React from 'react';
import { Box } from '@mui/material'
import {
  EventActions,
  ProcessedEvent,
  ViewEvent
} from "@aldabil/react-scheduler/types";
import { Scheduler } from '@aldabil/react-scheduler';

export default function App() {

  const fetchRemote = async (query: ViewEvent): Promise<ProcessedEvent[]> => {
    console.log({ query });
    /**Simulate fetchin remote data */
    fetch("http://localhost:5000/reservations")
    .then((res) => res.json())
    return new Promise((res) => {
      setTimeout(() => {
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

      const isFail = Math.random() > 0.6;
      // Make it slow just for testing
      setTimeout(() => {
        if (isFail) {
          rej("Ops... Faild");
        } else {
          res({
            ...event,
            event_id: event.event_id || Math.random()
          });
        }
      }, 3000);
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
            events={[
                {
                event_id: 1,
                title: "Event 1",
                start: new Date("2023/4/17 09:30"),
                end: new Date("2023/4/17 10:30"),
                },
            ]}
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

