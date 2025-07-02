import React, { useState, useMemo } from 'react';
import { useEvents } from '../hooks/useEvents';
import EventCard from '../components/EventCard';
import SearchAndFilter from '../components/SearchAndFilter';
import { Calendar } from 'lucide-react';

const EventsPage: React.FC = () => {
  const { events, loading, getTotalAttendees } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredEvents = useMemo(() => {
    let filtered = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const now = new Date();
    const oneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const oneMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    switch (dateFilter) {
      case 'upcoming':
        filtered = filtered.filter(event => new Date(event.date) > now);
        break;
      case 'this-week':
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate > now && eventDate <= oneWeek;
        });
        break;
      case 'this-month':
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate > now && eventDate <= oneMonth;
        });
        break;
    }

    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, searchTerm, dateFilter]);

  if (loading) {
    return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center">        <div className="text-center">
      <Calendar className="h-12 w-12 text-emerald-600 animate-bounce mx-auto mb-4" />          <p className="text-gray-600 text-lg">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg">      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4">
            Events in Addis Ababa
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover gatherings around the city and connect with fellow attendees.
          </p>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
        />

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-500 mb-2">No events found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              {searchTerm || dateFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Check back later for upcoming events'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                totalAttendees={getTotalAttendees(event)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;