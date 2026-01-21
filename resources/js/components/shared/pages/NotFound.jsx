import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function NotFound({ message = 'Page not found', autoRedirect = false, redirectDelay = 3000 }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (autoRedirect) {
      const timer = setTimeout(() => {
        navigate('/', { state: { message: 'Item not found', type: 'error' } });
      }, redirectDelay);
      return () => clearTimeout(timer);
    }
  }, [autoRedirect, redirectDelay, navigate]);

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="mb-8">
        <svg
          className="mx-auto h-24 w-24 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">{message}</h2>
      <p className="text-gray-600 mb-8">
        {autoRedirect
          ? `Redirecting you back to the inventory list in ${redirectDelay / 1000} seconds...`
          : 'The item you are looking for does not exist or may have been deleted.'}
      </p>

      <div className="flex justify-center space-x-4">
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
        >
          Go to Inventory List
        </Link>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 font-medium"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
