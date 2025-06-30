import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import EventsPage from './pages/EventsPage';
import RSVPPage from './pages/RSVPPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/rsvp" element={<RSVPPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;