import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EventCard from '../EventCard';
import type { Event } from '../../types/Event';

const sampleEvent: Event = {
  id: 'test-1',
  title: 'Test Event Title',
  date: '2025-09-01T12:00:00.000Z',
  description: 'A description.',
  images: ['/images/events1-1.png'],
  attendees: [],
};

test('EventCard renders the event title', () => {
  render(
    <MemoryRouter>
      <EventCard event={sampleEvent} totalAttendees={0} />
      </MemoryRouter>
  );
  expect(screen.getByText('Test Event Title')).toBeInTheDocument();
});