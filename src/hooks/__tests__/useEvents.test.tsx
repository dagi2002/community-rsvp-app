import { renderHook, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useEvents } from '../../hooks/useEvents';
import { Attendee } from '../../types/Event';

const mockEvents = [
  {
    id: '1',
    title: 'Test',
    date: '',
    description: '',
    images: [],
    attendees: []
  }
];

beforeEach(() => {
  global.fetch = vi.fn().mockImplementation((url: RequestInfo, options?: RequestInit) => {
    if (url === '/api/events' && (!options || options.method === 'GET')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(mockEvents) });
    }
    if (url === '/api/events/1/rsvp' && options?.method === 'POST') {
      const attendee = JSON.parse(options.body as string);
      mockEvents[0].attendees.push(attendee);
      return Promise.resolve({ ok: true, json: () => Promise.resolve(mockEvents[0]) });
    }
    return Promise.reject(new Error('Unknown endpoint'));
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useEvents', () => {

  it('adds RSVP correctly', async () => {
    const { result } = renderHook(() => useEvents());

    await waitFor(() => expect(result.current.loading).toBe(false));

    const attendee: Attendee = {
      name: 'Tester',
      email: 'tester@example.com',
      guests: 0,
    };

    await act(async () => {
      await result.current.addRSVP('1', attendee);
    });

    const event = result.current.events.find(e => e.id === '1');
    expect(event?.attendees.some(a => a.email === attendee.email)).toBe(true);
  });
});