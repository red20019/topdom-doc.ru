<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DocumentTracking extends Model
{
  protected $fillable = [
    'document_id', 'stage_document','date_start_stage','date_end_stage'
  ];
}
