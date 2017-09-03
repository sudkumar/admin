@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                @include("partials.sidebar")
            </div>
            <div class="col-md-9">
                @yield("main")
            </div>
        </div>
    </div>
@endsection