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

      //dd($this->tracking);

      switch ($this->stage) {
        case '0':
          //$stage = "На расcмотрении у Эмиля уже {$date_interval} с {$date}";
          $stage = "На расcмотрении у Эмиля";
          //$stage = $stage->date_start_stage;
          break;
        case '1':
          //$stage = "На расcмотрении у бухгалтера уже {$date_interval} с {$date}";
          $stage = "На расcмотрении у бухгалтера ";
          break;
        case '2':
          $stage = "Документ Расcмотрен {$this->tracking->where('stage_document',$this->stage)->date_end_stage}";
          break;
        case '3':
          $stage = "Документ Отклонен {$this->tracking->where('stage_document',$this->stage)->date_end_stage}";
          break;
      }
        if($this->check->count()>0){
          $is_check=true;
        }
        else{
          $is_check=false;
        }

      return [
        'id' => $this->id,
        'name' => $this->user->name,
        'avatar' => $this->user->avatar,
        'document_name' => $this->name,
        'stage_number' => $this->stage,
        'date_add' => $date,
        'stage_text' => $stage,
        'is_check' => $is_check,
        'count_files'=> $this->resources->count(),
        'url' => 'documents/'.$this->id
    ];
    }
}
