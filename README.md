# Inventory Management System

A modern web application for managing inventory items, built with Laravel and React.

## About

This Inventory Management System provides a comprehensive solution for tracking and managing inventory items. The application features a RESTful API backend powered by Laravel and a modern React frontend with Material UI (MUI) for a professional, component-based user interface.

### Features

- **Item Management**: Create, read, update, and delete inventory items
- **Quantity Tracking**: Monitor stock levels for each item
- **RESTful API**: Clean and intuitive API endpoints for all operations
- **Input Validation**: Comprehensive request validation for data integrity
- **Error Handling**: Automatic ID validation with proper 404 responses for invalid or non-existent items
- **Modern UI**: React-based frontend with Material UI (MUI)
- **Professional UI Kit**: Material UI components for a polished, enterprise-grade interface
- **Client-side Routing**: React Router for seamless navigation
- **Modal Confirmations**: MUI Dialog-based delete confirmation modals
- **Date Formatting**: Consistent date display with date-fns
- **Responsive Design**: Mobile-friendly interface with MUI's responsive components
- **Real-time Updates**: Fast and responsive user interface

## Tech Stack

### Backend
- **Laravel 12**: PHP web framework
- **MySQL/PostgreSQL**: Database (configurable)
- **RESTful API**: Resource controllers with route model binding
- **Form Request Validation**: Dedicated request classes for input validation
- **Eloquent ORM**: Database abstraction and model relationships

### Frontend
- **React 19**: UI library
- **React Router 7**: Client-side routing and navigation
- **Material UI (MUI) 6**: Professional React component library
- **Emotion**: CSS-in-JS styling (MUI dependency)
- **MUI Icons**: Comprehensive icon set
- **date-fns**: Modern date formatting and manipulation
- **Vite 7**: Build tool and development server
- **Axios**: HTTP client for API requests

## Requirements

- PHP >= 8.2
- Composer
- Node.js >= 18.x
- npm or yarn
- MySQL/PostgreSQL or SQLite

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inventory-management-system
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure database**
   
   Update your `.env` file with your database credentials:
   ```env
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=inventory_management_system
    DB_USERNAME=postgres
    DB_PASSWORD=
   ```

6. **Run migrations**
   ```bash
   php artisan migrate
   ```

7. **Build assets**
   ```bash
   npm run build
   ```

## Development

### Quick Setup
Use the setup script to get everything configured:
```bash
composer run setup
```

### Running the Application

**Option 1: Run both frontend and backend concurrently**
```bash
npm start
```

**Option 2: Run separately**

Backend (Laravel):
```bash
php artisan serve
# or
npm run serve
```

Frontend (Vite):
```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000

### Development Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build assets for production
- `npm run serve` - Start Laravel development server
- `npm start` - Run both frontend and backend concurrently
- `composer run dev` - Run Laravel with queue listener and logs
- `composer run test` - Run PHPUnit tests

## API Endpoints

### Items Resource

- `GET /api/items` - List all items
- `POST /api/items` - Create a new item
- `GET /api/items/{id}` - Get a specific item
- `PUT /api/items/{id}` - Update an item
- `DELETE /api/items/{id}` - Delete an item

### Request/Response Examples

**Create Item**
```bash
POST /api/items
Content-Type: application/json

{
  "name": "Laptop",
  "quantity": 10
}

Response: 201 Created
{
  "id": 1,
  "name": "Laptop",
  "quantity": 10,
  "created_at": "2026-01-20T00:00:00.000000Z",
  "updated_at": "2026-01-20T00:00:00.000000Z"
}
```

**Update Item**
```bash
PUT /api/items/1
Content-Type: application/json

{
  "name": "Laptop",
  "quantity": 8
}

Response: 200 OK
{
  "id": 1,
  "name": "Laptop",
  "quantity": 8,
  "created_at": "2026-01-20T00:00:00.000000Z",
  "updated_at": "2026-01-20T00:00:00.000000Z"
}
```

**Get Item**
```bash
GET /api/items/1

Response: 200 OK
{
  "id": 1,
  "name": "Laptop",
  "quantity": 8,
  "created_at": "2026-01-20T00:00:00.000000Z",
  "updated_at": "2026-01-20T00:00:00.000000Z"
}
```

**Delete Item**
```bash
DELETE /api/items/1

Response: 204 No Content
```

### Error Responses

The API uses Laravel's route model binding for automatic ID validation and error handling:

**Invalid ID Format**
```bash
GET /api/items/abc

Response: 404 Not Found
{
  "message": "No query results for model [App\\Models\\Item] abc"
}
```

**Item Not Found**
```bash
GET /api/items/999

Response: 404 Not Found
{
  "message": "No query results for model [App\\Models\\Item] 999"
}
```

**Validation Error**
```bash
POST /api/items
Content-Type: application/json

{
  "name": "",
  "quantity": -5
}

Response: 422 Unprocessable Entity
{
  "message": "The name field is required. (and 1 more error)",
  "errors": {
    "name": ["The name field is required."],
    "quantity": ["The quantity field must be at least 0."]
  }
}
```

## Frontend Features

### Routing
The application uses React Router for client-side navigation:
- `/` - Inventory list (home page)
- `/add` - Create new item form
- `/edit/:id` - Edit existing item form
- `/404` - Item not found page (with auto-redirect)
- `*` - Page not found (catch-all route)

### Components Architecture

**Feature-based Organization**
- `inventory/` - Item management components grouped by feature
  - `forms/` - Item creation and editing forms
  - `index/` - Inventory listing and table view

**Shared Components**
- `modals/` - Reusable modal dialogs (DeleteModal)
- `pages/` - Common page components (NotFound)
- `Layout.jsx` - App layout wrapper with navigation

**Services Layer**
- `itemService.js` - API client with centralized error handling
  - Custom `ApiError` class for better error management
  - Consistent HTTP methods (GET, POST, PUT, DELETE)

**Utilities**
- `dateFormatter.js` - Date formatting functions using date-fns

### UI Features
- **Responsive Design**: Mobile-friendly tables and forms
- **Loading States**: Spinners and disabled states during API calls
- **Success/Error Messages**: Dismissible alert notifications
- **Delete Confirmation**: Modal dialog with item details
- **Form Validation**: Client-side and server-side validation
- **Keyboard Navigation**: ESC key to close modals

### Material UI Integration

The application uses Material UI (MUI) as a professional UI component library, demonstrating:

**Core Components Used:**
- `AppBar` & `Toolbar` - Navigation header with branded styling
- `Table`, `TableContainer`, `TableHead`, `TableBody` - Professional data tables
- `TextField` - Form inputs with built-in validation states
- `Button` & `IconButton` - Consistent action buttons with icons
- `Dialog` - Modal confirmations with proper accessibility
- `Alert` - Success/error notifications with auto-dismiss
- `Paper` - Elevated surfaces for content sections
- `Chip` - Badge-style quantity indicators
- `CircularProgress` - Loading spinners
- `Stack` & `Box` - Layout components for spacing and alignment

**MUI Icons:**
- `Inventory`, `Add`, `Edit`, `Delete` - Action icons
- `Save`, `Cancel` - Form actions
- `Warning`, `Home`, `ArrowBack`, `SentimentDissatisfied` - Status and navigation

**Theme Customization:**
- Custom color palette (primary blue #2563eb, secondary red #dc2626)
- Typography configuration with system font stack
- Consistent spacing and elevation throughout the app

**Benefits:**
- Professional, polished UI out of the box
- Accessibility features built-in (ARIA attributes, keyboard navigation)
- Responsive components that adapt to all screen sizes
- Consistent design language across all pages
- Easy maintenance and extensibility

## Database Schema

### Items Table
- `id` - Primary key (bigint, auto-increment)
- `name` - Item name (string, max 255 characters, indexed)
- `quantity` - Stock quantity (unsigned integer, minimum 0)
- `created_at` - Timestamp
- `updated_at` - Timestamp

## Code Organization

### Component Structure Philosophy

The frontend follows industry best practices for React application structure:

1. **Feature-based Organization**: Components are grouped by feature (`inventory/`) for better scalability
2. **Separation of Concerns**: 
   - Components handle UI rendering
   - Services manage API communication
   - Utils provide shared functionality
3. **Reusability**: Shared components in `shared/` folder can be used across features
4. **File Naming Conventions**:
   - `.jsx` for React components (contains JSX)
   - `.js` for pure JavaScript modules (utilities, services)
   - Page components suffix with `Page` (e.g., `ItemFormPage.jsx`)

### Best Practices Implemented

- **Component Composition**: Small, focused components that do one thing well
- **Error Boundaries**: Graceful error handling with user-friendly messages
- **Loading States**: UI feedback during asynchronous operations
- **Accessible UI**: Keyboard navigation and ARIA attributes
- **Consistent Styling**: Tailwind CSS utilities for maintainable styles
- **Date Formatting**: Centralized date formatting for consistency

## Security & Best Practices

### API Security
- **Route Model Binding**: Automatic ID validation prevents SQL injection and invalid input errors
- **Form Request Validation**: All inputs are validated before processing
- **Type Safety**: Strong typing in controllers and models
- **Database Protection**: Invalid IDs return 404 responses without exposing database errors

### Error Handling
The application implements robust error handling:
- **Invalid ID formats** (e.g., `/api/items/abc`) return proper 404 responses
- **Non-existent resources** return consistent 404 responses
- **Validation failures** return 422 responses with detailed error messages
- **Database errors** are caught and handled gracefully

## Testing

Run the test suite:
```bash
composer run test
# or
php artisan test
```

## Project Structure

```
inventory-management-system/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── ItemController.php
│   │   └── Requests/
│   │       ├── StoreItemRequest.php
│   │       └── UpdateItemRequest.php
│   └── Models/
│       └── Item.php
├── database/
│   └── migrations/
│       └── 2026_01_20_003942_create_items_table.php
├── resources/
│   ├── js/
│   │   ├── app.jsx                    # Main app with routing
│   │   ├── components/
│   │   │   ├── inventory/             # Feature-specific components
│   │   │   │   ├── forms/
│   │   │   │   │   ├── ItemForm.jsx
│   │   │   │   │   └── ItemFormPage.jsx
│   │   │   │   └── index/
│   │   │   │       └── InventoryList.jsx
│   │   │   └── shared/                # Reusable components
│   │   │       ├── modals/
│   │   │       │   └── DeleteModal.jsx
│   │   │       ├── pages/
│   │   │       │   └── NotFound.jsx
│   │   │       └── Layout.jsx
│   │   ├── services/
│   │   │   └── itemService.js         # API client
│   │   └── utils/
│   │       └── dateFormatter.js       # Date utilities
│   └── views/
│       └── app.blade.php
├── routes/
│   ├── api.php
│   └── web.php
└── tests/
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
