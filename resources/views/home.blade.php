@extends('layouts.withsidebar')

@section('main')
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-4">
            <div class="panel panel-success text-center">
                <div class="panel-heading">
                    <h1>
                        {{ \App\User::count() }}
                    </h1>
                </div>
                <div class="panel-body">Users</div>
            </div>
        </div>
    </div>
</div>
@endsection
