<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DocumentResource extends Model
{
  protected $fillable = ['document_id', 'filename'];

  public function product()
  {
      return $this->belongsTo('App\Document');
  }
}
