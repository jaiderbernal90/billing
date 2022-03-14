<?php

namespace App\helpers;

class ResponseHelper
{
    public static function exitsAndNoExitsResponse($message)
    {
        return response()->json([
            'status' => 'ERROR',
            'success' => false,
            'message' => $message
        ]);
    }

    public static function errorResponse($error, $message)
    {

        return response()->json([
            'status' => 'ERROR',
            'success' => false,
            'message' => $message,
            'error' => $error
        ]);
    }
    public static function createAndUpdateResponse($data, $message)
    {

        return response()->json([
            'status' => 'OK',
            'success' => true,
            'message' => $message,
            'data' =>  $data
        ]);
    }

    public static function getResponse($data)
    {

        return response()->json([
            'status' => 'OK',
            'success' => true,
            'data' =>  $data
        ]);
    }

    public static function deleteResponse($message)
    {

        return response()->json([
            'status' => 'OK',
            'success' => true,
            'message' => $message,
        ]);
    }
}
