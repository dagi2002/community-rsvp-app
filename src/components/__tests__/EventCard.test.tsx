import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EventCard from '../EventCard';
import type { EventType } from '../../types/Event';

const sampleEvent: EventType = {
  id: 'test-1',
  title: 'Test Event Title',
  date: '2025-09-01T12:00:00.000Z',
  description: 'A description.',
  attendees: [],
};

test('EventCard renders the event title', () => {
  render(
    <MemoryRouter>
      <EventCard event={sampleEvent} />
    </MemoryRouter>
  );
  expect(screen.getByText('Test Event Title')).toBeInTheDocument();
});