<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
  public function login(Request $request)
  {


    //$validator = Validator::make($request->all(), [
    //  'email' => 'required|email',
    //  'password' => 'required',
    //]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {

        return $this->sendError('Logining Error.', 'error');
        //throw ValidationException::withMessages([
        //    'email' => ['The provided credentials are incorrect.'],
        //]);
    }
    $success['token'] =  $user->createToken($request->email)->plainTextToken;
    $success['name'] =  $user->name;
    return $this->sendResponse($success, 'User logining.');
  //$user->createToken($input['email'])->accessToken;
  }

  public function logout(Request $request)
  {
    $request->user()->currentAccessToken()->delete();
    $success['name'] =  $request->user()->name;
    return $this->sendResponse($success, 'User logout.');
  }
}
