<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }
    public function main(Request $request)
    {
        //$user=$request->user();
        //if($user->role=='no_role'){
        //    return view('waiting');
        //}
        //else{
        //    return view('user');
        //}
        //$role=$user->role;
        //$user::where('id', '1')->firstOrFail();
        //var_dump($role);

    }

    public function login()
    {
        //$user=$request->user();
        //if($user->role=='no_role'){
        //    return view('waiting');
        //}
        //else{
        //    return view('user');
        //}
        //$role=$user->role;
        //$user::where('id', '1')->firstOrFail();
        //var_dump($role);
        return view('login');

    }



}
