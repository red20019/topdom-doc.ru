<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ReactRouting extends Controller
{
  public function show (Request $request, $path) {

     //$path;
        $login='yes';
        if ($path=='login')
          $login='no';
        elseif ($path=='register')
          $login='no';
        elseif ($path=='')
          $login='no';

        return view('react',['login' => $login]);


  }

  public function NonAuthenticate (Request $request) {

    //if(Auth::check()){
      //return var_dump($request);
      //return redirect('/main');
    //}
   // else{

    return 1;
    //}
  }
}
