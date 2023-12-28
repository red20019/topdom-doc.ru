<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Postcontroller extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //
    }

    public function post(Request $request)
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
        var_dump($request);

    }
}
