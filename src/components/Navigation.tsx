import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, UserPlus } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-4">
        <img src="/images/placeholder.png" alt="Community Events logo" className="h-16 w-16" />
        <Calendar className="h-8 w-8 text-emerald-600" />
        <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
          Community Events
        </span>
      </div>

          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === '/'
                  ? 'bg-gradient-to-r from-emerald-600 to-amber-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <Calendar size={18} />
              <span>All Events</span>
            </Link>
            <Link
              to="/rsvp"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === '/rsvp'
                  ? 'bg-gradient-to-r from-emerald-600 to-amber-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <UserPlus size={18} />
              <span>Make an RSVP</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;