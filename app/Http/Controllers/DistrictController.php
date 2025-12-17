<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\District;

class DistrictController extends Controller
{
    public function index()
    {
        $districts = District::all();
        return response()->json($districts);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $district = District::firstOrCreate([
            'name' => $validated['name'],
        ]);

        return response()->json($district, 201);
    }
}
