<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ReactRouting extends Controller
{
  public function show (Request $request) {
        return view('react');
  }

}
