import { Event } from '../types/Event';

const STORAGE_KEY = 'community-events-v2';

export const getEventsFromStorage = (): Event[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) as Event[] : getSampleEvents();
  } catch (error: unknown) {
    console.error('Error loading events from storage:', error);
    return getSampleEvents();
  }
};

export const saveEventsToStorage = (events: Event[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error: unknown) {
    console.error('Error saving events to storage:', error);
  }
};

const getSampleEvents = (): Event[] => [
  {
    id: '1',
    title: 'Coffee Tasting at Dukamo-Bole',
    date: '2025-07-12T10:00:00.000Z',
    description: 'Experience the rich flavors of Ethiopian coffee with local experts in Bole.',
    images: [
      '/images/events1-0.png',
      '/images/events1-1.png',
      '/images/events1-2.png',
    ],
    attendees: [
      { name: 'Abebe Bekele', email: 'abebe@example.com', guests: 1 },
      { name: 'Helina Tesfaye', email: 'helina@example.com', guests: 0 },
    ],
  },
  {
    id: '2',
    title: 'Walking Tour of Historic Piazza',
    date: '2025-07-15T08:30:00.000Z',
    description: "Discover Addis Ababa's oldest neighborhoods on this guided walking tour.",
    images: ['/images/event2-1.png', '/images/event2-2.png'],
    attendees: [
      { name: 'Kalkidan Hailu', email: 'kalkidan@example.com', guests: 2 }
    ]
  },
  {
    id: '3',
    title: 'Injera Cooking Workshop at Megenagna',
    date: '2025-07-11T15:00:00.000Z',
    description: 'Learn how to make traditional injera and wot with our expert Momma chefs.',
    images: ['/images/event3-1.png', '/images/event3-2.png'],
    attendees: [
      { name: 'Liya Teshome', email: 'birhanu@example.com', guests: 100 }
    ]
  },
  {
    id: '4',
    title: 'Traditional Dance Night at Meskel Square',
    date: '2025-08-30T18:00:00.000Z',
    description: 'Enjoy live music and traditional dances under the stars in Meskel Square.',
    images: ['/images/event4-1.png', '/images/event4-2.png'],
    attendees: [
      { name: 'Yonas Girma', email: 'yonas@example.com', guests: 3 },
      { name: 'Lily Mekonnen', email: 'lily@example.com', guests: 1 },
      { name: 'Samuel Tariku', email: 'samuel@example.com', guests: 3 }
    ]
  },
  {
    id: '5',
    title: 'Art Exhibition at Hilton Hotel - Kikundi',
    date: '2025-09-10T12:00:00.000Z',
    description: 'Explore the vibrant world of art at Addis Ababa Museum.',
    images: ['/images/event5-1.png', '/images/event5-2.png'],
    attendees: [
      { name: 'Dagmawit Teshale', email: 'Dagmawit1@example.com', guests: 1 },
      { name: 'Dagmawit Moges', email: 'Dagmawit2@example.com', guests: 1 }
    ]
  },
  {
    id: '6',
    title: 'Boredom Busting at Unity Park Zoo',
    date: '2025-09-15T09:00:00.000Z',
    description: 'Discover the wonders of nature at one of Addis Ababa’s most popular zoos.',
    images: ['/images/event6-1.png', '/images/event6-2.png'],
    attendees: []
  },
  {
    id: '7',
    title: 'Jazz Night with Mulatu Astatke at Gihon Hotel',
    date: '2025-09-19T12:00:00.000Z',
    description: 'Experience an unforgettable evening of Ethio-jazz as Mulatu Astatke performs live in the historic Gihon Hotel ballroom.',
    images: ['/images/event7-1.png', '/images/event7-2.png'],
    attendees: [
      { name: 'Dagem Amogne', email: 'dagmawi@example.com', guests: 1 },
      { name: 'Fitsum Moges', email: 'Fistum@example.com', guests: 1 }
    ]
  }
];