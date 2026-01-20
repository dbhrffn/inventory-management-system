import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">
              Inventory Management System
            </h1>
            <div className="flex space-x-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Inventory List
              </Link>
              <Link
                to="/add"
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  location.pathname === '/add'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                + Add Item
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="container mx-auto p-4 max-w-6xl">
        <Outlet />
      </main>
    </div>
  );
}
