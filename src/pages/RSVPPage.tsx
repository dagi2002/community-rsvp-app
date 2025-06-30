import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { UserPlus, Calendar, Check, AlertCircle } from 'lucide-react';

const RSVPPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { events, addRSVP } = useEvents();
  
  const preselectedEventId = searchParams.get('event');
  
  const [formData, setFormData] = useState({
    eventId: preselectedEventId || '',
    name: '',
    email: '',
    guests: 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedEvent = events.find(event => event.id === formData.eventId);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.eventId) {
      newErrors.eventId = 'Please select an event';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.guests < 0) {
      newErrors.guests = 'Number of guests cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      addRSVP(formData.eventId, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        guests: formData.guests
      });

      setSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">RSVP Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for registering. We'll send you event details and updates to your email.
          </p>
          <div className="text-sm text-gray-500">
            Redirecting to events page...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <UserPlus className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Make an RSVP 
          </h1>
          <p className="text-gray-600">
            Register for an upcoming community event
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="eventId" className="block text-sm font-semibold text-gray-700 mb-2">
                Select Event *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  id="eventId"
                  value={formData.eventId}
                  onChange={(e) => handleInputChange('eventId', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.eventId ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                >
                  <option value="">Choose an event...</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title} - {new Date(event.date).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>
              {errors.eventId && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.eventId}
                </div>
              )}
            </div>

            {selectedEvent && (
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-2">{selectedEvent.title}</h3>
                <p className="text-purple-700 text-sm mb-2">{selectedEvent.description}</p>
                <p className="text-purple-600 text-sm">
                  📅 {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.name && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.email && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                id="guests"
                min="0"
                max="10"
                value={formData.guests}
                onChange={(e) => handleInputChange('guests', parseInt(e.target.value) || 0)}
                placeholder="0"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.guests ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              />
              <p className="text-sm text-gray-500 mt-1">
                How many additional people will you bring? (Maximum 10)
              </p>
              {errors.guests && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.guests}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting RSVP...</span>
                </div>
              ) : (
                'Make an RSVP'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RSVPPage;