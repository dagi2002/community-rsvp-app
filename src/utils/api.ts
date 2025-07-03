export async function fetchEvents() {
    const res = await fetch('/api/events');
    if (!res.ok) {
      throw new Error('Failed to load events');
    }
    return res.json();
  }
  
  export async function rsvpToEvent(eventId: string, attendee: {name: string; email: string; guests: number}) {
    const res = await fetch(`/api/events/${eventId}/rsvp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(attendee)
    });
    if (!res.ok) {
      throw new Error('Failed to submit RSVP');
    }
    return res.json();
  }