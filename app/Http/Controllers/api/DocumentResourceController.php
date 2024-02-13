<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\PostFormDocument;
use App\DocumentResource;
use App\Document;
use App\DocumentTracking;

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
       $document = Document::create($request->all());
      //$document = new Document();
      //  $document->name = $request->input('name');
      //  $document->user_id = $request->user()->id;
      //  $document->save();
//
        //$resource = new DocumentResource();
        foreach($request->file('files') as $file){
          $path = $file->store('documents');
          DocumentResource::create([
            'document_id' => $document->id,
            'path' => $path,
            'filename' => $file->getClientOriginalName()
          ]);
          ///$resource = new DocumentResource();
          ///$resource->path = $file->store('documents');
          ///$resource->document_id = $document->id;
        }

        DocumentTracking::create([
          'document_id' => $document->id,
          'stage_document' => $document->stage,
          'date_start_stage' => Carbon::now()->date('d.m.Y H:i:s')

        ]);


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
