import { useState, useEffect } from 'react';
import { Event, Attendee } from '../types/Event';
import { getEventsFromStorage, saveEventsToStorage } from '../utils/storage';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = () => {
      const storedEvents = getEventsFromStorage();
      setEvents(storedEvents);
      setLoading(false);
    };

    loadEvents();
  }, []);

  const addRSVP = (eventId: string, attendee: Attendee) => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        const existingAttendee = event.attendees.find(a => a.email === attendee.email);
        if (existingAttendee) {
          return {
            ...event,
            attendees: event.attendees.map(a => 
              a.email === attendee.email ? attendee : a
            )
          };
        } else {
          return {
            ...event,
            attendees: [...event.attendees, attendee]
          };
        }
      }
      return event;
    });

    setEvents(updatedEvents);
    saveEventsToStorage(updatedEvents);
  };

  const getTotalAttendees = (event: Event): number => {
    return event.attendees.reduce((total, attendee) => total + 1 + attendee.guests, 0);
  };

  return {
    events,
    loading,
    addRSVP,
    getTotalAttendees
  };
};