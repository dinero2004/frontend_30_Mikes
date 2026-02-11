<?php
namespace App\Http\Controllers;

use App\Http\Controllers\NewsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UploadsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/user', [UserController::class, 'create']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/users', [UserController::class, 'index']);
Route::get('/news', [NewsController::class, 'index']);
Route::post('/uploads', [UploadsController::class, 'store'])
  ->middleware('auth:sanctum');


// Users
Route::put('/users/{id}', [UserController::class, 'update']);
Route::patch('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/uploads', [UploadsController::class, 'create']);
    Route::get('/uploads', [UploadsController::class, 'index']);
    Route::delete('/uploads/{id}', [UploadsController::class, 'destroy']);
});

// News
Route::put('/news/{id}', [NewsController::class, 'update']);
Route::patch('/news/{id}', [NewsController::class, 'update']);
Route::delete('/news/{id}', [NewsController::class, 'destroy']);