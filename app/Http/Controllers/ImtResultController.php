<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ImtResult;
use Inertia\Inertia;

class ImtResultController extends Controller
{
    public function index() {
        $imtResult = ImtResult::where('user_id', auth()->id())->get();
        return Inertia::render('history/index', [
            'imtResult' => $imtResult,
        ]);
    }
    public function store(Request $request) {
        $validated = $request->validate([
            'parent_name' => 'required',
            'child_name' => 'required',
            'gender' => 'required',
            'age' => 'required',
            'weight' => 'required',
            'height' => 'required',
            'province' => 'required',
            'city' => 'required',
            'district' => 'required',
        ]);

        $year = $request->input('year') ?? null;
        $weight_nearest = $request->input('weight_nearest') ?? null;
        $weight_zscore = $request->input('weight_zscore') ?? null;
        $weight_category = $request->input('weight_category') ?? null;
        $height_nearest = $request->input('height_nearest') ?? null;
        $height_zscore = $request->input('height_zscore') ?? null;
        $height_category = $request->input('height_category') ?? null;
        $wh_nearest = $request->input('wh_nearest') ?? null;
        $wh_zscore = $request->input('wh_zscore') ?? null;
        $wh_category = $request->input('wh_category') ?? null;
        $imt_nearest = $request->input('imt_nearest') ?? null;
        $imt_zscore = $request->input('imt_zscore') ?? null;
        $imt_category = $request->input('imt_category') ?? null;
        $address = $request->input('address') ?? null;

        try {
            ImtResult::create([
                'user_id' => auth()->id(),
                'parent_name' => $validated['parent_name'],
                'child_name' => $validated['child_name'],
                'gender' => $validated['gender'],
                'age' => $validated['age'],
                'weight' => $validated['weight'],
                'height' => $validated['height'],
                'province' => $validated['province'],
                'city' => $validated['city'],
                'district' => $validated['district'],
                'year' => $year,
                'weight_nearest' => $weight_nearest,
                'weight_zscore' => $weight_zscore,
                'weight_category' => $weight_category,
                'height_nearest' => $height_nearest,
                'height_zscore' => $height_zscore,
                'height_category' => $height_category,
                'wh_nearest' => $wh_nearest,
                'wh_zscore' => $wh_zscore,
                'wh_category' => $wh_category,
                'imt_nearest' => $imt_nearest,
                'imt_zscore' => $imt_zscore,
                'imt_category' => $imt_category,
                'address' => $address,
            ]);
            return redirect()->route('imt-result.index');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Gagal menyimpan data');
        }        
    }
}
