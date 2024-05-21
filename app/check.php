<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class check extends Model
{
  protected $fillable = [
    'document_id','path','user_id'
  ];
}
