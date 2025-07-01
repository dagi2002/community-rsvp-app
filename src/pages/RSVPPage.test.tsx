import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RSVPPage from './RSVPPage';
test('RSVP form validation - TODO', () => {
  render(
    <MemoryRouter>
      <RSVPPage />
    </MemoryRouter>
  );
  // TODO: implement validation tests
});