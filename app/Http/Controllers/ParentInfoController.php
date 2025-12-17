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
            'name' => 'required|max:255',
            'address' => 'required',
        ]);

        ParentInfo::create($validated);

        return redirect()->route('parents.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $parent = ParentInfo::find($id);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
