<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Zscore;
use Inertia\Inertia;
use Inertia\Response;

class CalculatorController extends Controller
{
    public function result(Request $request): Response
    {
        $height = $request->input('height');
        $weight = $request->input('weight');
        $age = $request->input('age');
        $gender = $request->input('gender');
        $name = $request->input('name');

        $zscoreBB = Zscore::select('min3SD', 'min2SD', 'min1SD', 'median', 'plus1SD', 'plus2SD', 'plus3SD')
        ->where('age', $age)->where('gender', $gender)
        ->where('zscore_type', 'BB/U')
        ->first();

        $zscoreType = (int) $age > 23 ? 'TB/U' : 'PB/U';

        $zscorePTB = Zscore::select('min3SD', 'min2SD', 'min1SD', 'median', 'plus1SD', 'plus2SD', 'plus3SD')
        ->where('age', $age)->where('gender', $gender)
        ->where('zscore_type', $zscoreType)
        ->first();

        return Inertia::render('result', [
            'name' => $name,
            'zscoreBB' => $zscoreBB,
            'zscorePTB' => $zscorePTB,
            'weight' => $weight,
            'height' => $height,
            'age' => $age,
            'gender' => $gender,
        ]);
    }

    private function getBMICategory($bmi)
    {
        if ($bmi < 18.5) {
            return 'Underweight';
        } elseif ($bmi >= 18.5 && $bmi < 25) {
            return 'Normal weight';
        } elseif ($bmi >= 25 && $bmi < 30) {
            return 'Overweight';
        } else {
            return 'Obese';
        }
    }
}
