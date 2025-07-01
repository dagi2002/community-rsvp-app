import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock } from 'lucide-react';
import { Event } from '../types/Event';

interface EventCardProps {
  event: Event;
  totalAttendees: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, totalAttendees }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const { date, time } = formatDate(event.date);

  const maxImages = 3;
  const minImages = 1;
  const images = event.images ? event.images.slice(0, maxImages) : [];
  const placeholders = Math.max(minImages - images.length, 0);
  const displayImages = [
    ...images,
    ...Array(placeholders).fill('/images/placeholder.png'),
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (!target.src.includes('placeholder.png')) {
      target.src = '/images/placeholder.png';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="h-2 bg-gradient-to-r from-emerald-500 to-amber-500"></div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 p-1">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`${event.title} ${idx + 1}`}
              
              onError={handleImageError}

              className="w-full h-auto object-cover rounded-sm shadow-sm"/>   
                     ))}
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-200 line-clamp-2">
            {event.title}
          </h3>
          <div className="flex items-center space-x-1 bg-emerald-50 px-3 py-1 rounded-full">
            <Users size={16} className="text-emerald-600" />
            <span className="text-emerald-700 font-semibold text-sm">{totalAttendees}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {event.description}
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2 text-gray-700">
            <Calendar size={16} className="text-emerald-500" />
            <span className="text-sm font-medium">{date}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <Clock size={16} className="text-amber-500" />
            <span className="text-sm font-medium">{time}</span>
          </div>
        </div>

        <Link
          to={`/rsvp?event=${event.id}`}
          className="block w-full bg-gradient-to-r from-emerald-600 to-amber-600 text-white text-center py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          RSVP Now
        </Link>
      </div>
    </div>
  );
};

export default EventCard;