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
        $year = $request->input('year') ?? null;
        $month = $request->input('month') ?? '0';
        $gender = $request->input('gender');
        $name = $request->input('name');

        $zscoreBB = null;
        $zscorePTB = null;
        $zscoreBBPB = null;
        $zscoreIMT = null;
        $zscoreIMT5 = null;

        if ($year) {
            if ($year === '5' && $month === '0') {
                $month = 1;
            }
            $age = $month;
            // anak umur 5th sampai dengan 18 tahun
            $zscoreIMT5 = Zscore::select('min3SD', 'min2SD', 'min1SD', 'median', 'plus1SD', 'plus2SD', 'plus3SD')
            ->where('age', $month)
            ->where('year', $year)
            ->where('gender', $gender)
            ->where('zscore_type', 'IMT5')
            ->first();
        } else {
            $zscoreBB = Zscore::select('min3SD', 'min2SD', 'min1SD', 'median', 'plus1SD', 'plus2SD', 'plus3SD')
            ->where('age', $age)
            ->where('gender', $gender)
            ->where('zscore_type', 'BB/U')
            ->first();

            $zscorePTB = Zscore::select('min3SD', 'min2SD', 'min1SD', 'median', 'plus1SD', 'plus2SD', 'plus3SD')
            ->where('age', $age)
            ->where('gender', $gender)
            ->where('zscore_type', (int) $age > 23 ? 'TB/U' : 'PB/U')
            ->first();

            $fractional_part = fmod($height, 1);

            // 2. Check if the fractional part is NOT equal to 0.5
            //    We use a small tolerance (epsilon) for safe floating-point comparison.
            $epsilon = 0.000001;
            $roundHeight = $height;
            if (abs($fractional_part - 0.5) > $epsilon) {
                // This block executes if the fractional part is NOT 0.5 (e.g., 0.4, 0.6, 0.1, 0.9)
                $roundHeight = round($height);
            }

            $zscoreBBPB = Zscore::select('min3SD', 'min2SD', 'min1SD', 'median', 'plus1SD', 'plus2SD', 'plus3SD')
            ->where('height', $roundHeight)
            ->where('gender', $gender)
            ->where('zscore_type', (int) $age > 23 ? 'BB/TB' : 'BB/PB')
            ->first();

            if ($age > 23) {
                $zscoreIMT = Zscore::select('min3SD', 'min2SD', 'min1SD', 'median', 'plus1SD', 'plus2SD', 'plus3SD')
                ->where('age', $age)
                ->where('gender', $gender)
                ->where('zscore_type', 'IMT2')
                ->first();
            } else {
                $zscoreIMT = Zscore::select('min3SD', 'min2SD', 'min1SD', 'median', 'plus1SD', 'plus2SD', 'plus3SD')
                ->where('age', $age)
                ->where('gender', $gender)
                ->where('zscore_type', 'IMT1')
                ->first();
            }
        }

        return Inertia::render('result', [
            'name' => $name,
            'zscoreBB' => $zscoreBB,
            'zscorePTB' => $zscorePTB,
            'zscoreBBPB' => $zscoreBBPB,
            'zscoreIMT' => $zscoreIMT,
            'zscoreIMT5' => $zscoreIMT5,
            'weight' => $weight,
            'height' => $height,
            'age' => $age,
            'year' => $year,
            'month' => $month,
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
