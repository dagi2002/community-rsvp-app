import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-emerald-50 via-amber-50 to-yellow-50 flex flex-col items-center justify-center text-center p-4">
      <AlertCircle size={48} className="text-emerald-600 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-amber-700 transition-all duration-200"      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;