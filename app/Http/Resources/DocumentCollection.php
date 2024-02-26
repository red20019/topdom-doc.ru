<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Carbon\Carbon;
use Carbon\CarbonInterval;
use App\Http\Resources\DocumentTracking;

class DocumentCollection extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
      //dd($this->tracking->all()[0]->date_start_stage);
      $date = $this->created_at->format('d.m.Y H:i');

      //$date_ru=$this->created_at->locale('ru');
      $date_interval= CarbonInterval::make($this->created_at->diff(carbon::now()))->locale('ru')->forHumans();
      //$date_diff = $date_ru->diffForHumans(carbon::now()->locale('ru'));

      switch ($this->stage) {
        case '0':
          $stage = "На расмотрении у Эмиля уже {$date_interval} с {$date}";

          //$stage = $stage->date_start_stage;
          break;
        case '1':
          $stage = "На расмотрении у Бухгалтера уже уже {$date_interval} с {$date}";
          break;
        case '2':
          $stage = "Документ Расмотрен {$this->tracking->where('stage_document',$this->stage)[0]->date_end_stage}";
          break;
        case '3':
          $stage = "Документ Отклонен {$this->tracking->where('stage_document',$this->stage)[0]->date_end_stage}";
          break;
      }


      return [
        'id' => $this->id,
        'name' => $this->user->name,
        'avatar' => $this->user->avatar,
        'document_name' => $this->name,
        'date_add' => $date,
        'status' => $stage,
        'url' => '/document/'.$this->id
    ];
    }
}
