<?php

use Illuminate\Support\Facades\Route;

// Catch-all route for React Router
// This ensures all routes (/, /add, etc.) serve the React app
Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');
