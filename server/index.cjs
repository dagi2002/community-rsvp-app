const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'events.json');

let events = [];
try {
  events = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
} catch (err) {
  console.error('Failed to load events.json', err);
  events = [];
}

function saveEvents() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
}

app.get('/api/events/:id/rsvps', (req, res) => {
  res.json(events);
});

app.get('/api/events/:id/rsvp', (req, res) => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
});

app.post('/api/events/:id/rsvp', (req, res) => {
  const { id } = req.params;
  const { name, email, guests } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  const event = events.find((e) => e.id === id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  const existing = event.attendees.find((a) => a.email === email);
  if (existing) {
    existing.name = name;
    existing.guests = guests ?? 0;
  } else {
    event.attendees.push({ name, email, guests: guests ?? 0 });
  }
  saveEvents();
  res.json(event);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});