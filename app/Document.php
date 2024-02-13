<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
  protected $fillable = [
    'name', 'user_id', 'stage'
  ];
}
