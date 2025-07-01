import { beforeEach, expect, test } from 'vitest';
import { getEventsFromStorage, saveEventsToStorage } from './storage';


type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  attendees: any[];
};

const sample: Event[] = [
  { id: '1', title: 'A', description: '', date: '', attendees: [] }
];

beforeEach(() => {
  localStorage.clear();
});

test('save and load events', () => {
  saveEventsToStorage(sample as any);
  const loaded = getEventsFromStorage();
  expect(loaded).toEqual(sample);
});