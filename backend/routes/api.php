<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TwilioController;

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


// Route::get('/index', [TwilioController::class, 'index'])->name('homepage');


// // Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
// //     return $request->user();
// // });


// Route::group(['prefix' => 'users', 'middleware' => 'CORS'], function ($router){
    
   
//     // //Private Route
//     Route::post('/room', [TwilioController::class, 'create']); //creare una nuova stanza
//     // Route::post('/room/close', [RoomController::class, 'close']);
//     // Route::post('/room/join', [RoomController::class, 'join']);
//     // Route::get('/room/streamer/{room}', [RoomController::class, 'streamerInfo']);  //informazioni

//     // // //Public Route
//     // Route::get('/room/roomsActive', [RoomController::class, 'roomsActive']); //stream attvi
//     // Route::get('/room/roomsByGame', [RoomController::class, 'roomsByGame']); //stream attvi
// });

