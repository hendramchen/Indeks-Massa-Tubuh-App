<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ChildInfo;
use App\Models\Measurement;
use App\Models\Zscore;
use App\Actions\Measurement\MeasureAction;

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
        
        $children = $query->paginate(10);
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
            return redirect()->route('parents.show', $validated['parent_info_id']);
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
        $measurements = $child->measurements()->orderByDesc('note_date')->get();
        $measureAction = new MeasureAction();
        $ageInfo = $measureAction->getAgeFromBirthDate($child->birth_date);
        $ageString = $ageInfo['mode'] === 'months' ? $ageInfo['total_months'] . ' bulan' : $ageInfo['years'] . ' tahun ' . $ageInfo['months'] . ' bulan';

        $ageList = [];
        $ageInc = $ageInfo['total_months'] - 3;
        for ($i = 0; $i < 6; $i++) {
            $ageList[] = $ageInc;
            $ageInc = $ageInc + 1;
        }
        $chartData = $measureAction->getChartDataByAge($child->gender, $ageList, 'BB/U');
        return Inertia::render('children/child-info', [
            'id' => $id, 'child' => $child, 
            'parent' => $parent, 
            'ageString' => $ageString,
            'measurements' => $measurements,
            'chartData' => $chartData
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
            'gender' => 'required',
            'birth_date' => 'required|date',
        ]);

        $child = ChildInfo::find($id);
        if (!$child) {
            abort(404);
        }

        try {
            $child->update($validated);
            return redirect()->route('children.show', $child->id);
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Gagal menyimpan data');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $child = ChildInfo::find($id);
        if ($child) {
            $child->delete();
            return redirect()->back();
        }
        return redirect()->back()->with('error', 'Gagal menghapus data');
    }

    public function calculate(Request $request, string $childId) {
        $validated = $request->validate([
            'height' => 'required',
            'weight' => 'required',
            'note_date' => 'required|date',
        ]);
        $height = $validated['height'];
        $weight = $validated['weight'];
        $noteDate = $validated['note_date'];
        $child = ChildInfo::find($childId);
        if ($child) {
            $measureAction = new MeasureAction();
            // break down birth date to age
            $ageInfo = $measureAction->getAgeFromBirthDate($child->birth_date);
            $measurement = [];
            
            $measurement['weight'] = $weight;
            $measurement['height'] = $height;
            $measurement['note_date'] = $noteDate;
            $measurement['user_id'] = auth()->user()->id;
            $measurement['child_info_id'] = $child->id;

            if ($ageInfo['years'] >= 5) {
                $year = $ageInfo['year'];
                $age = $year == 5 && $ageInfo['months'] == 0 ? 1 : $ageInfo['months'];
                $data = $measureAction->calculateIMT5Plus($child->gender, $age, $year, $weight, $height);

                $measurement['age'] = $ageInfo['total_months'];
                $measurement['months'] = $ageInfo['months'];
                $measurement['years'] = $year;
                $measurement['weight_nearest'] = null;
                $measurement['weight_zscore'] = null;
                $measurement['weight_category'] = null;
                $measurement['height_nearest'] = null;
                $measurement['height_zscore'] = null;
                $measurement['height_category'] = null;
                $measurement['wh_nearest'] = null;
                $measurement['wh_zscore'] = null;
                $measurement['wh_category'] = null;
                $measurement['imt_actual'] = $data['imt_actual'];
                $measurement['imt_nearest'] = $data['nearest'];
                $measurement['imt_zscore'] = $data['zscoreWithSign'];
                $measurement['imt_category'] = $data['category'];
            } else {
                $data = $measureAction->calculateAll($child->gender, $ageInfo['total_months'], $weight, $height);
                $measurement['age'] = $ageInfo['total_months'];
                $measurement['months'] = $ageInfo['months'];
                $measurement['years'] = $ageInfo['years'];
                $measurement['weight_nearest'] = $data['BB']['nearest'];
                $measurement['weight_zscore'] = $data['BB']['zscoreWithSign'];
                $measurement['weight_category'] = $data['BB']['category'];
                $measurement['height_nearest'] = $data['PTB']['nearest'];
                $measurement['height_zscore'] = $data['PTB']['zscoreWithSign'];
                $measurement['height_category'] = $data['PTB']['category'];
                $measurement['wh_nearest'] = $data['BBPB']['nearest'];
                $measurement['wh_zscore'] = $data['BBPB']['zscoreWithSign'];
                $measurement['wh_category'] = $data['BBPB']['category'];
                $measurement['imt_actual'] = $data['IMT']['imt_actual'];
                $measurement['imt_nearest'] = $data['IMT']['nearest'];
                $measurement['imt_zscore'] = $data['IMT']['zscoreWithSign'];
                $measurement['imt_category'] = $data['IMT']['category'];
            }
            try {
                Measurement::create($measurement);
                return redirect()->route('children.show', $child->id);
            } catch (\Throwable $th) {
                return redirect()->back()->with('error', 'Gagal menyimpan data');
            }
        }
        return response()->json([
            'data' => null
        ]);
    }

    public function getChartDataBB($gender='female', $ages=[38, 39, 40, 41, 42, 43]) {
        $data =  Zscore::select('min3SD', 'min2SD', 'min1SD', 'median', 'plus1SD', 'plus2SD', 'plus3SD')
            ->where('gender', $gender)
            ->where('zscore_type', 'BB/U')
            ->whereIn('age', $ages)
            ->get();
        return response()->json([
            'data' => $data
        ]);
    }


}
