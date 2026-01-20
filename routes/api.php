<?php

use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;

// API routes are automatically prefixed with /api

Route::apiResource('items', ItemController::class);
