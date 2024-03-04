<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DocumentShow extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
    //return [
    //    'id' => $this->resource->id
////
    //];
        //return parent::toArray($request);
     return [
      "id" => $this->id,
      "filename" => $this->filename,
      "path" => $this->path

    //    "id" => $this->id,
    //    "name" => $this->name,
    //    "stage" => $this->stage,
    //    "created_at" => $this->created_ad,
    //    "resources" => ["id" => $this->resources->id,
    //                    "filename" => $this->resources->filename,
    //                    "path" => $this->resources->path
    //                   ]
     ];
    }
}
