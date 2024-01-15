<?php

use Illuminate\Support\Facades\Route;
//use Illuminate\Http\Request;
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

Route::get('/', 'HomeController@main')->name('home');
Route::get('/login', 'HomeController@main')->name('login');

Route::get('/register', 'HomeController@main')->name('register');

Route::middleware('auth:sanctum')->get('/{path?}', [
  'uses' => 'ReactRouting@show',
  'as' => 'react',
  'where' => ['path' => '.*']
])->where('path', '^((?!api).)*$');




//Route::get('/login', [
//  'uses' => 'ReactRouting@NonAuthenticate',
//  'as' => 'non_authenticate',
//  'where' => ['path' => '.*']]);
//
//Route::get('/register', [
//    'uses' => 'ReactRouting@NonAuthenticate',
//    'as' => 'non_authenticate',
//    'where' => ['path' => '.*']]);
//Route::get('/', [
//      'uses' => 'ReactRouting@NonAuthenticate',
//      'as' => 'non_authenticate',
//      'where' => ['path' => '.*']]);
//





//Route::get('/', function () {
//    return view('welcome');
//});
//
//Route::get('/pending', function () {
//    return view('pending');
//});
//
//Route::get('/react', function () {
//    return view('react');
//});
//
//Route::get('/admin', function () {
//    return view('admin');
//});
////Route::get('/user', function () {
////    return view('user');
////});
////Route::middleware('auth:api')->get('/user', function () {
////  return view('user');
////});
//Route::middleware('auth:sanctum')->get('/user', function () {
//  return 1;
//});
//Route::get('/login', 'HomeController@main')->name('login');
//
////Auth::routes();
//
//Route::post('/post', 'PostController@post')->name('post');
//
////Route::get('/home', 'HomeController@index')->name('home');
//
//Route::get('/main', 'HomeController@main')->name('main');
//
