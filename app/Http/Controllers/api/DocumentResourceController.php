<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\PostFormDocument;
use App\DocumentResource;
use App\Document;
use App\DocumentTracking;
use Illuminate\Support\Arr;

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
    public function show(DocumentResource $documentResource)
    {
        //
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
