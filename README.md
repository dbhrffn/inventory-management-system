# Inventory Management System

A modern web application for managing inventory items, built with Laravel and React.

## About

This Inventory Management System provides a comprehensive solution for tracking and managing inventory items. The application features a RESTful API backend powered by Laravel and a modern React frontend with Tailwind CSS for styling.

### Features

- **Item Management**: Create, read, update, and delete inventory items
- **Quantity Tracking**: Monitor stock levels for each item
- **RESTful API**: Clean and intuitive API endpoints for all operations
- **Modern UI**: React-based frontend with Tailwind CSS
- **Real-time Updates**: Fast and responsive user interface

## Tech Stack

### Backend
- **Laravel 12**: PHP web framework
- **MySQL/PostgreSQL**: Database (configurable)
- **Laravel API Resources**: RESTful API endpoints

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
```

**Update Item**
```bash
PUT /api/items/1
Content-Type: application/json

{
  "name": "Laptop",
  "quantity": 8
}
```

## Database Schema

### Items Table
- `id` - Primary key
- `name` - Item name (string, indexed)
- `quantity` - Stock quantity (unsigned integer)
- `created_at` - Timestamp
- `updated_at` - Timestamp

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
