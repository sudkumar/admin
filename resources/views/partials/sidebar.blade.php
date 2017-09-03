<aside>
    <nav class="list-group">
        <div class="list-group-item text-uppercase" style="background-color: whitesmoke;">MAIN</div>
        <a href={{ route("home") }} class="list-group-item {{ Request::is("home") ? 'active' : '' }}">Dashboard</a>
    </nav>
    <nav class="list-group">
        <div class="list-group-item text-uppercase" style="background-color: whitesmoke;">ADMIN</div>
        <a href={{ route("users") }} class="list-group-item {{ Request::is(["users", "register"]) ? 'active' : '' }}">Users</a>
    </nav>
</aside>