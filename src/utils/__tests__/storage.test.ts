import { getEventsFromStorage, saveEventsToStorage } from '../storage';
import { describe, expect, test, beforeEach } from 'vitest';

const mockEvents = [
  { id: '1', title: 'Test', description: '', date: '', images: [], attendees: [] }
];

beforeEach(() => {
  localStorage.clear();
});

describe('storage utils', () => {
  test('saveEventsToStorage and getEventsFromStorage work as expected', () => {
    saveEventsToStorage(mockEvents);
    const loaded = getEventsFromStorage();
    expect(loaded).toEqual(mockEvents);
  });
});