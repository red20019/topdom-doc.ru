<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DocumentTrackerCollection extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
          "id" => $this->id,
          "stage_document" => $this->stage_document,
          "date_start_stage" => $this->date_start_stage,
          "date_end_stage" => $this->date_end_stage

        //    "id" => $this->id,
        //    "stage_document" => $this->name,
        //    "stage" => $this->stage,
        //    "created_at" => $this->created_ad,
        //    "resources" => ["id" => $this->resources->id,
        //                    "filename" => $this->resources->filename,
        //                    "path" => $this->resources->path
        //                   ]
         ];
    }
}
