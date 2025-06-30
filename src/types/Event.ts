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
  attendees: Attendee[];
}