<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Livewire\Attributes\Validate;
use PhpParser\Node\Stmt\Return_;

class PostFormDocument extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

      return [
        'name' => 'required',
        'files'   => 'array',
        'files.*' => 'file|required|max:512000'
      ];
     // $rules = [
     //   'name' => 'required',
     //   'files'   => 'array',
     //   'files.*' => 'file|required|max:512000'
     // ];
      //dd($this->file('files'));
     // if(!empty($this->file('files'))){
     //   $count = count($this->file('files'))-1;
     //   if($count>10){
     //
     //   }
     //
     // }
     // else{
     //   $count = 0;
     // }
//


     //foreach(range(0,$count ) as $index) {
     //  $rules['files.' . $index] = 'file|required|max:512000';
     //}

      //return $rules;
    }
    //public function messages()
    //{
    //    return [
    //        'name.required' => 'The :attribute field is required.',
    //        'files.0' => 'A message is required321',
    //        'succses' => 'text',
    //        'email' => 'dirección de correo electrónico',
//
    //    ];
    //}


}
