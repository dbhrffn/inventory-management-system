# Inventory Management System

A modern web application for managing inventory items, built with Laravel and React.

## About

This Inventory Management System provides a comprehensive solution for tracking and managing inventory items. The application features a RESTful API backend powered by Laravel and a modern React frontend with Tailwind CSS for styling.

### Features

- **Item Management**: Create, read, update, and delete inventory items
- **Quantity Tracking**: Monitor stock levels for each item
- **RESTful API**: Clean and intuitive API endpoints for all operations
- **Input Validation**: Comprehensive request validation for data integrity
- **Error Handling**: Automatic ID validation with proper 404 responses for invalid or non-existent items
- **Modern UI**: React-based frontend with Tailwind CSS
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
- **Tailwind CSS 4**: Utility-first CSS framework
- **Vite**: Build tool and development server
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

## Database Schema

### Items Table
- `id` - Primary key (bigint, auto-increment)
- `name` - Item name (string, max 255 characters, indexed)
- `quantity` - Stock quantity (unsigned integer, minimum 0)
- `created_at` - Timestamp
- `updated_at` - Timestamp

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
│   │   ├── app.jsx
│   │   └── components/
│   └── views/
├── routes/
│   ├── api.php
│   └── web.php
└── tests/
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
