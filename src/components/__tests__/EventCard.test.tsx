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

describe('EventCard', () => {
  it('renders event title', () => {
    render(
      <MemoryRouter>
        <EventCard event={sampleEvent} totalAttendees={0} />
      </MemoryRouter>
    );
    expect(screen.getByText('Test Event Title')).toBeInTheDocument();
  });

  it('renders event description', () => {
    render(
      <MemoryRouter>
        <EventCard event={sampleEvent} totalAttendees={0} />
      </MemoryRouter>
    );
    expect(screen.getByText('A description.')).toBeInTheDocument();
  });

  it('renders RSVP link with correct href', () => {
    render(
      <MemoryRouter>
        <EventCard event={sampleEvent} totalAttendees={5} />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /rsvp now/i })).toHaveAttribute(
      'href',
      `/rsvp?event=${sampleEvent.id}`
    );
  });

  it('renders event image when provided', () => {
    render(
      <MemoryRouter>
        <EventCard event={sampleEvent} totalAttendees={0} />
      </MemoryRouter>
    );
    expect(screen.getByAltText(/Test Event Title 1/i)).toBeInTheDocument();
  });
});