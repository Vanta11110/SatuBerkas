<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

public function show(User $admin)
    {   
        User::find($admin);
        return response()->json($admin);
    }

public function destroy(User $admin)
{
    $admin->delete();
    return response()->json("terhapus");
}
public function getTotalAdmin()
{
    $totalAdmin = User::count();

    return response()->json(['totalAdmin' => $totalAdmin]);
}
public function store(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required',
        'email' => 'required|unique:users',
        'password' => 'required',
    ]);

    $validatedData['password'] = bcrypt($validatedData['password']);

    User::create($validatedData);

    return response()->json(['message' => 'Pengguna telah ditambahkan']);
}

}
