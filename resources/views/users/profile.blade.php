@extends("layouts.withsidebar")

@section("main")
<div class="panel panel-info">
    <div class="panel-heading">
        <h2 class="panel-title">Your Profile</h2>
    </div>
    <div class="panel-body">
        <div class="media">
            <div class="media-left">
                <img src="{{ asset('img/user-icon-placeholder.png') }}" class="img img-responsive img-circle img-thumbnail" style="width: 100px; max-width: 100px; height: auto;">
            </div>
            <div class="media-body">
                <span class="pull-right text-muted">Updated: {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $user->updated_at)->diffForHumans() }}</span>
                <h1 class="media-heading">
                    {{ $user->name }}
                </h1>
                <p class="text-muted">{{ $user->email }}</p>
            </div>
        </div>
    </div>
</div>

@endsection