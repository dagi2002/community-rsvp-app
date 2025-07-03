import { useState, useEffect } from 'react';
import { Event, Attendee } from '../types/Event';
import { fetchEvents, rsvpToEvent } from '../utils/api';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const addRSVP = async (eventId: string, attendee: Attendee) => {
    try {
      const updated = await rsvpToEvent(eventId, attendee);
      setEvents(events.map(e => (e.id === eventId ? updated : e)));
    } catch (err) {
      console.error(err);
    }
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