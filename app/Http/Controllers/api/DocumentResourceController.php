<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\PostFormDocument;
use App\DocumentResource;
use App\Document;
use App\DocumentTracking;
use Illuminate\Support\Arr;
use App\Http\Resources\DocumentCollection;

use Carbon\Carbon;

class DocumentResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(PostFormDocument $request)
    {
      $document = Document::create([
        'name' => $request->input('name'),
        'user_id' => $request->user()->id
      ]);

        $document_files=[];
        foreach($request->file('files') as $file){
          array_push($document_files,$file->getClientOriginalName());
          $path = $file->store('documents');
          DocumentResource::create([
            'filename' => $file->getClientOriginalName(),
            'path' => $path,
            'document_id' => $document->id

          ]);
        }

        DocumentTracking::create([
          'document_id' => $document->id,
          'stage_document' => 0,
          'date_start_stage' => Carbon::now()

        ]);
        $success['document_name'] = $document->name;
        $success['document_files'] =  $document_files;

        return $this->sendResponse($success, 'documents added');

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\DocumentResource  $documentResource
     * @return \Illuminate\Http\Response
     */
    public function show(Document $document, Request $request)
    {
      return DocumentCollection::collection(
        Document::with('user','resources','tracking')->paginate(10)
      );

    //return new DocumentCollection($flight);
     //return Document::find(1)->getData;
     //return Document::all();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\DocumentResource  $documentResource
     * @return \Illuminate\Http\Response
     */
    public function edit(DocumentResource $documentResource)
    {
        //
    }

        /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\DocumentResource  $documentResource
     * @return \Illuminate\Http\Response
     */
    public function upd(DocumentResource $documentResource, Request $request)
    {
      //dd($request);
      $document = Document::findOrFail($request->input('id'));
      if($request->input('status')=='accepted'){
        $document->stage = 1;
        $document->tracking
            ->where('stage_document','0')
            ->first()
            ->update(['date_stage_end' => Carbon::now()]);
        $document->save();

        DocumentTracking::create([
          'document_id' => $document->id,
          'stage_document' => 1,
          'date_start_stage' => Carbon::now()
        ]);

      }elseif($request->input('status')=='rejected'){
        //dd( $document->tracking->where('stage_document','0')->first());
        $document->stage = 4;
        $document->tracking->where('stage_document','0')->first()->update(['date_stage_end' => Carbon::now()]);
        $document->save();

      }

      $success['id_document'] = $document->id;
      $success['status'] = $request->input('status');

      return $this->sendResponse($success, 'stage update');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DocumentResource  $documentResource
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DocumentResource $documentResource)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DocumentResource  $documentResource
     * @return \Illuminate\Http\Response
     */
    public function destroy(DocumentResource $documentResource)
    {
        //
    }
}
