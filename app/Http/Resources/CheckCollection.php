<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CheckCollection extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {


        Storage::copy('private/'.$this->path, 'public/'.$this->path);
        $url="storage/".$this->path;
        return [
          "id" => $this->id,
          "path" => $url
        ];
    }
}

