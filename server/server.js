const http = require('http');
const { parse } = require('url');
const { readFileSync, writeFileSync, existsSync } = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data', 'events.json');

function getSampleEvents() {
  return [
    {
      id: '1',
      title: 'Coffee Tasting at Dukamo-Bole',
      date: '2025-07-12T10:00:00.000Z',
      description: 'Experience the rich flavors of Ethiopian coffee with local experts in Bole.',
      images: [
        '/images/events1-3.JPG',
        '/images/events1-0.png',
        '/images/events1-6.JPG',
        '/images/events1-4.JPG',
        '/images/events1-2.png',
        '/images/events1-5.JPG'
      ],
      attendees: [
        { name: 'Abebe Bekele', email: 'abebe@example.com', guests: 1 },
        { name: 'Helina Tesfaye', email: 'helina@example.com', guests: 0 }
      ]
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
      images: ['/images/event3-1.png', '/images/event3-7.jpg', '/images/event3-3.jpeg', '/images/event3-2.png', '/images/event3-6.jpg', '/images/event3-4.jpg'],
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
}

function loadEvents() {
  if (existsSync(DATA_FILE)) {
    return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
  }
  const sample = getSampleEvents();
  writeFileSync(DATA_FILE, JSON.stringify(sample, null, 2));
  return sample;
}

let events = loadEvents();

function saveEvents() {
  writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
}

const server = http.createServer((req, res) => {
  const { pathname } = parse(req.url, true);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method === 'GET' && pathname === '/api/events') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(events));
    return;
  }

  if (req.method === 'POST' && pathname && pathname.startsWith('/api/events/') && pathname.endsWith('/rsvps')) {
    const parts = pathname.split('/');
    const eventId = parts[3];
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const attendee = JSON.parse(body.toString() || '{}');
        const event = events.find(e => e.id === eventId);
        if (!event) {
          res.statusCode = 404;
          res.end('Event not found');
          return;
        }
        const existing = event.attendees.findIndex(a => a.email === attendee.email);
        if (existing !== -1) {
          event.attendees[existing] = attendee;
        } else {
          event.attendees.push(attendee);
        }
        saveEvents();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(event));
      } catch (e) {
        res.statusCode = 400;
        res.end('Invalid JSON');
      }
    });
    return;
  }

  res.statusCode = 404;
  res.end('Not Found');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});