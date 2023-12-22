<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel React</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }
            .position-ref {
                position: relative;
            }
            .content {
                width: 100%;
                text-align: center;
            }
        </style>
        <script src="{{ asset('js/app.js') }}" defer></script>
    </head>
    <body>
        <div class="position-ref full-height">

            <div class="content">
                <div id="application"></div>
            </div>
        </div>
    </body>
</html>
