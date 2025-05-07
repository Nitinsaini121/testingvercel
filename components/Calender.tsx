'use client'

import { format, getDay, parse, startOfWeek } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import { useState } from 'react'
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = { 'en-US': enUS }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales
})

// Define the event type
interface CalendarEvent extends Event {
  title: string
  start: Date
  end: Date
}

const events: CalendarEvent[] = [
  {
    title: 'Project Deadline',
    start: new Date(2025, 2, 15, 10, 0), // March 15, 2025, 10:00 AM
    end: new Date(2025, 2, 15, 12, 0)
  },
  {
    title: 'Team Meeting',
    start: new Date(2025, 2, 18, 14, 0), // March 18, 2025, 2:00 PM
    end: new Date(2025, 2, 18, 16, 0)
  },
  {
    title: 'Team Meeting',
    start: new Date(2025, 2, 18, 14, 0), // March 18, 2025, 2:00 PM
    end: new Date(2025, 2, 18, 16, 0)
  }
]

export default function MyCalendar() {
  const [myEvents, setMyEvents] = useState<CalendarEvent[]>(events)

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor='start'
        endAccessor='end'
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  )
}
