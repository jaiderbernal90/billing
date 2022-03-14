<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BillingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api'], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'] );
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::group(['prefix' => 'billing'], function ($router) {
    Route::get('getAll', [BillingController::class, 'index']);
    Route::get('get/{id}', [BillingController::class, 'show'] );
    Route::post('create', [BillingController::class, 'create'] );
    Route::post('update/{id}', [BillingController::class, 'update']);
    Route::delete('delete/{id}', [BillingController::class, 'destroy']);
});