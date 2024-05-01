<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\URL;

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
        Cache::put('/temp/' . $this->path, 300);
        Storage::copy('private/'.$this->path, 'public/'.$this->path);
        $url="storage/".$this->path;
        //$url=Storage::disk('private')->path("u30evOBvt0SwYoat4UxcmJhiUqpyWSlkEykX6KSo.jpg");
        //$url = Storage::disk('private')->temporaryUrl(
        //  'u30evOBvt0SwYoat4UxcmJhiUqpyWSlkEykX6KSo.jpg', now()->addMinutes(5)
        //);
       // $url=mb_convert_encoding($url, 'UTF-8', 'UTF-8');
        //$url=URL::temporarySignedRoute($url,now()->addMinutes(30));
     return [
      "id" => $this->id,
      "filename" => $this->filename,
      "file" => $url

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
