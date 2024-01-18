<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /**
     * Register api
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
      //$validator = Validator::make($request->all(), [
      //  'name' => ['required', 'string', 'max:255'],
      //  'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
      //  'password' => ['required', 'string', 'min:8', 'confirmed'],
      //]);
      $validator = Validator::make($request->all(), [
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        'password' => ['required', 'string', 'min:8', 'confirmed'],
      ]);

        if($validator->fails()){
          return $this->sendError('Validation Error.', $validator->errors(),"401");
          //return $validator->errors();
          //return $validator;

        }
//

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken($input['email'])->accessToken;
        $success['name'] =  $user->name;
        return $this->sendResponse($success, 'User register successfully.');
    }
}
