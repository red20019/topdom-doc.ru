<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Validation\ValidationException as ValidationException;
use Illuminate\Support\Facades\Response;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Throwable
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }


    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */

    public function render($request, Throwable $exception)
    {

      if(get_class($exception) == "Illuminate\Database\Eloquent\ModelNotFoundException") {
        return response()->json(['message' => 'document id not found','success' => false], 422);
        //return (new Response('Model not found', 400));
      }


      if ($exception instanceof ValidationException) {

        return response()->json(['message' => 'data is invalid', 'errors' => $exception->validator->getMessageBag(),'success' => false], 422);

      }
      if ($exception instanceof NotFoundHttpException) { // for 404
        // do stuff
        //abort(404);
      }
      if ($exception instanceof MethodNotAllowedHttpException) { // for checking  api method
        // do stuff
        abort(403);
      }
        return parent::render($request, $exception);
    }
}
