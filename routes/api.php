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
//Route::middleware('auth:sanctum')->get('/user',function(Request $request){
//    return 111;
//})->name('ShowUser');
//Route::post('/register', 'api\RegisterController@register')->name('registerApi');
//Route::post('/login', 'api\LoginController@login')->name('loginApi');
Route::middleware('auth:sanctum')->get('/user', 'api\UserController@show')->name('ShowUser');
Route::middleware('auth:sanctum')->post('/documents', 'api\DocumentResourceController@create')->name('AddDocument');
//Route::middleware('auth:sanctum')->get('/logout', 'api\LoginController@logout')->name('logout');
//Route::get('/{path?}', [
//  'uses' => 'ReactRouting@NonAuthenticate',
//  'as' => 'non_authenticate',
//  'where' => ['path' => '.*']]);

//Route::post('/user', function (Request $request) {
  //return $request->user();
//});
