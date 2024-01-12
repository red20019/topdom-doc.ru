<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ReactRouting extends Controller
{
  public function show (Request $request) {

     //$path;
     return view('react',['name' => 1]);
  }

  public function NonAuthenticate (Request $request) {

    //if(Auth::check()){
    //  return redirect('/main');
    //}
    //else{
     return 1;
    //}
  }
}
