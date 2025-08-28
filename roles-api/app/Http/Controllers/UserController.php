<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function store(Request $request)
    {
         $validator = Validator::make($request->all(), [
        'full_name' => 'required|string',
        'email' => 'required|email|unique:users,email',
        'roles' => 'required|array',
        'roles.*' => 'required|string|exists:roles,name',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

        $user = User::create([
        'full_name' => $request->full_name,
        'email' => $request->email,
        'password'=> Hash::make('123456'),
    ]);

          $roleIds = Role::whereIn('name', $request->roles)->pluck('id');
          $user->roles()->attach($roleIds);


        return response()->json(['message' => 'User created successfully'], 201);
    }

    public function index(Request $request)
    {
        $roleName = $request->query('role');

        $users = User::with('roles')
            ->when($roleName, function ($query, $roleName) {
                $query->whereHas('roles', function ($q) use ($roleName) {
                    $q->where('name', $roleName);
                });
            })->get();

        return response()->json($users);
    }
    public function getByRole($roleId)
    {
        $users = User::whereHas('roles', fn($q) => $q->where('id', $roleId))->with('roles')->get();
        return response()->json($users);
   }
}
