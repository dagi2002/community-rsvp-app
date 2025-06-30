export interface Attendee {
  name: string;
  email: string;
  guests: number;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  /** Optional image to display with the event */
  images: string[];
  attendees: Attendee[];
}

export type EventType = Event;