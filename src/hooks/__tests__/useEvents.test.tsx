import { renderHook, act, waitFor } from '@testing-library/react';
import { useEvents } from '../useEvents';
import { Attendee } from '../../types/Event';

describe('useEvents', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('adds RSVP correctly', async () => {
    const { result } = renderHook(() => useEvents());

    await waitFor(() => expect(result.current.loading).toBe(false));

    const attendee: Attendee = {
      name: 'Tester',
      email: 'tester@example.com',
      guests: 0,
    };

    act(() => {
      result.current.addRSVP('1', attendee);
    });

    const event = result.current.events.find(e => e.id === '1');
    expect(event?.attendees.some(a => a.email === attendee.email)).toBe(true);
  });
});