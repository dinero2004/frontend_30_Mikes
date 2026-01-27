<?php
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\AuthController;

use Illuminate\Support\Facades\Route;

Route::post('/user', [UserController::class, 'create']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/users', [UserController::class, 'index']);
Route::get('/news', [NewsController::class, 'index']);

// Users
Route::put('/users/{id}', [UserController::class, 'update']);
Route::patch('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// News
Route::put('/news/{id}', [NewsController::class, 'update']);
Route::patch('/news/{id}', [NewsController::class, 'update']);
Route::delete('/news/{id}', [NewsController::class, 'destroy']);