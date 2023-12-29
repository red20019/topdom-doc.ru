<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/pending', function () {
    return view('pending');
});

Route::get('/react', function () {
    return view('react');
});

Route::get('/admin', function () {
    return view('admin');
});
//Route::get('/user', function () {
//    return view('user');
//});
Route::middleware('auth:sanctum')->get('/user', function () {
  return view('user');
});



//Auth::routes();

Route::post('/post', 'PostController@post')->name('post');

//Route::get('/home', 'HomeController@index')->name('home');

Route::get('/main', 'HomeController@main')->name('main');
