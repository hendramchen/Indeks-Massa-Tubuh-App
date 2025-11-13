<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Zscore;
use Inertia\Inertia;

class ZscoreController extends Controller
{
    public function index(Request $request)
    {
        $type = strtoupper($request->query('type', 'BB'));
        $gender = $request->query('gender', 'male');

        $zscoreType = $this->getCorrectType($type);
        $zscores = Zscore::where('zscore_type', $zscoreType)
        ->where('gender', $gender)->get();

        return Inertia::render('zscore-table/index', [
            'type' => $type,
            'gender' => $gender,
            'zscores' => $zscores,
        ]);
    }

    public function getCorrectType($type) {
        if ($type === 'BB') {
            return 'BB/U';
        } elseif ($type === 'PB') {
            return 'PB/U';
        } elseif ($type === 'TB') {
            return 'TB/U';
        } elseif ($type === 'BBPB') {
            return 'BB/PB';
        } elseif ($type === 'BBTB') {
            return 'BB/TB';
        } elseif ($type === 'IMT1') {
            return 'IMT1';
        } elseif ($type === 'IMT2') {
            return 'IMT2';
        } elseif ($type === 'IMT5') {
            return 'IMT5';
        }
    }
}
