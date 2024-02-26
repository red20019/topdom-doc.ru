<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
  protected $fillable = [
    'name', 'user_id', 'stage'
  ];

  //public function getDocuments(){
  //  return $this->belongsToMany('App\User')
  //  ->using('App\User')
  //  ->withPivot([
  //      'name',
  //      'avatar',
  //  ]);
  //}
 public function user() {
    return $this->belongsTo('App\User');
 }
 public function resources() {
    return $this->hasMany('App\DocumentResource');
 }
 public function tracking() {
  return $this->hasMany('App\DocumentTracking');
}

}
