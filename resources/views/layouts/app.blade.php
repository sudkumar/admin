<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Tourepedia') }}</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    <!-- styles -->
    <link rel="stylesheet" type="text/css" href="{{ asset(mix('css/app.css')) }}">
</head>
<body>
    <div id="app">
        @include("partials.header")
        <main>
            @yield('content')
        </main>
    </div>

    <script type="text/javascript" src="{{ asset(mix('js/manifest.js')) }}"></script>
    <script type="text/javascript" src="{{ asset(mix('js/vendor.js')) }}"></script>
    <script type="text/javascript" src="{{ asset(mix('js/app.js')) }}"></script>
</body>
</html>
