<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;

class GuestController extends Controller
{
  public function __construct()
  {
    $this->middleware('guest');
  }

  /**
   * Show the application dashboard.
   *
   * @return \Illuminate\Contracts\Support\Renderable
   */

  public function main(Request $request)
  {

      if (request()->bearerToken() && $user = Auth::guard('sanctum')->user()) {
          Auth::setUser($user);
          return redirect(RouteServiceProvider::HOME);
        //
        //Auth::setUser($user);
    }

      return view('react');

  }
}
