import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  dateFilter: string;
  onDateFilterChange: (filter: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  dateFilter,
  onDateFilterChange
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 mb-8">
      <div className="flex items-center gap-2 bg-white shadow-sm border border-gray-200 rounded-lg px-4 py-2">
        {/* Search icon */}
        <Search className="w-5 h-5 text-gray-400" />

        {/* Input */}
        <input
          type="text"
          placeholder="Search events by title..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
        />

        {/* Filter Button */}
        <div className="relative">
          <select
            value={dateFilter}
            onChange={(e) => onDateFilterChange(e.target.value)}
            className="text-sm text-gray-600 hover:text-gray-800 pr-2 pl-5 py-1 bg-transparent focus:outline-none appearance-none"
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>
          <Filter className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
