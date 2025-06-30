import { Event } from '../types/Event';

const STORAGE_KEY = 'community-events';

export const getEventsFromStorage = (): Event[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : getSampleEvents();
  } catch (error) {
    console.error('Error loading events from storage:', error);
    return getSampleEvents();
  }
};

export const saveEventsToStorage = (events: Event[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Error saving events to storage:', error);
  }
};

const getSampleEvents = (): Event[] => [
  {
    id: '1',
    title: 'React Meetup: Building Modern UIs',
    date: '2025-02-15T18:00:00.000Z',
    description: 'Join us for an evening of React best practices and modern UI development techniques.',
    attendees: [
      { name: 'John Doe', email: 'john@example.com', guests: 1 },
      { name: 'Sarah Wilson', email: 'sarah@example.com', guests: 0 }
    ]
  },
  {
    id: '2',
    title: 'TypeScript Workshop',
    date: '2025-02-22T14:00:00.000Z',
    description: 'Learn advanced TypeScript patterns and how to leverage them in your React applications.',
    attendees: [
      { name: 'Mike Johnson', email: 'mike@example.com', guests: 2 }
    ]
  },
  {
    id: '3',
    title: 'Open Source Contribution Day',
    date: '2025-03-01T10:00:00.000Z',
    description: 'Collaborate with fellow developers and contribute to open source React projects.',
    attendees: []
  },
  {
    id: '4',
    title: 'Frontend Performance Optimization',
    date: '2025-03-08T19:00:00.000Z',
    description: 'Deep dive into performance optimization techniques for modern web applications.',
    attendees: [
      { name: 'Emma Davis', email: 'emma@example.com', guests: 0 },
      { name: 'Alex Chen', email: 'alex@example.com', guests: 1 },
      { name: 'Lisa Brown', email: 'lisa@example.com', guests: 3 }
    ]
  }
];