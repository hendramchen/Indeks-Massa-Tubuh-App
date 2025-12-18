<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ParentInfo;

class ParentInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('parents/parent-list');
    }

    public function getParents(Request $request)
    {
        $query = ParentInfo::orderByDesc('created_at');
        
        // Apply filters if present
        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
        if ($request->filled('phone')) {
            $query->where('phone', 'like', '%' . $request->phone . '%');
        }
        if ($request->filled('city')) {
            $query->where('city', $request->city);
        }
        if ($request->filled('district')) {
            $query->where('district', $request->district);
        }
        
        $parents = $query->paginate(10);
        return response()->json($parents);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'address' => 'required|string',
        ]);

        try {
            ParentInfo::create($validated);
            return redirect()->route('parents.index');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Gagal menyimpan data');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $parent = ParentInfo::with('children')->find($id);
        if (!$parent) {
            abort(404);
        }
        return Inertia::render('parents/parent-info', [
            'parentId' => $id,
            'parent' => $parent,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'address' => 'required|string',
        ]);

        $parent = ParentInfo::find($id);
        if (!$parent) {
            abort(404);
        }

        try {
            $parent->update($validated);
            return redirect()->route('parents.show', $parent->id);
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Gagal menyimpan data');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
