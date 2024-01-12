<?php

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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::post('/register', 'api\RegisterController@register')->name('register_api');
Route::post('/login', 'api\LoginController@login')->name('login_api');
//Route::get('/{path?}', [
//  'uses' => 'ReactRouting@NonAuthenticate',
//  'as' => 'non_authenticate',
//  'where' => ['path' => '.*']]);

//Route::post('/user', function (Request $request) {
  //return $request->user();
//});
