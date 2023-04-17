import React from 'react';
import { Scheduler } from "@aldabil/react-scheduler";

export default function Calendar(){

    return( 
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
        />
    );
}