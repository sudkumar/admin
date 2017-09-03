@extends('layouts.withsidebar')

@section('main')
<div class="panel panel-info">
    <div class="panel-heading">
        <a class="pull-right" href="{{ route("register") }}">Add User</a>
        <h1 class="panel-title">Users</h1>
    </div>
    <ul class="list-group">
        @foreach ($users as $user)
            <li class="list-group-item">
                <div class="media">
                    <div class="media-left">
                        <img src="{{ asset('img/user-icon-placeholder.png') }}" class="img img-responsive img-circle img-thumbnail" style="width: 56px; max-width: 56px; height: auto;">
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">
                            {{ $user->name }}
                        </h4>
                        <p class="text-muted">{{ $user->email }}</p>
                    </div>
                </div>
            </li>
        @endforeach
    </ul>
</div>
@endsection