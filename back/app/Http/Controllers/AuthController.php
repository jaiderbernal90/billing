<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json([
                'status' => 'ERROR',
                'success' => false,
                'message' => 'Credenciales incorrectas'
            ]);
        }

        return $this->respondWithToken($token);
    }

        /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        try {

            $userExits = User::where('email', $request->input('email'))->first();

            if ($userExits) {
                return response()->json([
                    'status' => 'ERROR',
                    'success' => false,
                    'message' => 'Ya existe un usuario registrado con el email ingresado'
                ]);
            }


            $user = new User();
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $plainPassword = $request->input('password');
            $user->password = app('hash')->make($plainPassword);

            $user->save();

            return response()->json(['user' => $user, 'message' => 'CREATED'], 201);
        } catch (\Exception $th) {

            return var_dump($th);
            return response()->json([
                'status' => 'ERROR',
                'success' => false,
                'message' => 'El usuario no pudo ser guardado',
                'error' => $th
            ]);
        }
    }
    
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {

        return response()->json([
            'status' => 'OK',
            'success' => true,
            'token' => $token,
            'user' => Auth::user(),
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60,
            'date' => Carbon::now()
        ], 200);
    }
}