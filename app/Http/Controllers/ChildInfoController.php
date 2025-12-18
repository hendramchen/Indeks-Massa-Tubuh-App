<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ChildInfo;

class ChildInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('children/child-list');
    }

    public function getChildren(Request $request) {
        $query = ChildInfo::orderByDesc('created_at');
        
        // Apply filters if present
        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
        if ($request->filled('gender')) {
            $gender = $request->gender === 'all' ? null : $request->gender;
            if ($gender && ($gender === 'laki-laki' || $gender === 'perempuan')) {
                $query->where('gender', $gender);
            }
        }
        
        $children = $query->paginate(2);
        return response()->json($children);
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
            'gender' => 'required',
            'birth_date' => 'required|date',
            'parent_info_id' => 'required|exists:parent_infos,id',
        ]);

        try {
            ChildInfo::create($validated);
            return redirect()->route('children.index');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Gagal menyimpan data');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $child = ChildInfo::find($id);
        
        if (!$child) {
            abort(404);
        }
        $parent = $child->parentInfo;
        return Inertia::render('children/child-info', ['id' => $id, 'child' => $child, 'parent' => $parent]);
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
