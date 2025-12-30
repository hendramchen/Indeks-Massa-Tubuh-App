<?php

namespace App\Actions\Measurement;

use App\Models\Zscore;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

class MeasureAction
{
    public $zScoreCode = [
        '-3SD',
        '-2SD',
        '-1SD',
        'Median',
        '+1SD',
        '+2SD',
        '+3SD',
    ];

    public $zScoreBBCategory = [
        [
            'zScore' => ['<-3SD'],
            'category' => 'Berat badan sangat kurang (severely underweight)',
        ],
        [
            'zScore' => ['-3SD', '>-3SD', '<-2SD'],
            'category' => 'Berat badan kurang (underweight)',
        ],
        [
            'zScore' => [
                '-2SD',
                '>-2SD',
                '<-1SD',
                '-1SD',
                '>-1SD',
                '<Median',
                'Median',
                '>Median',
                '<+1SD',
                '+1SD',
            ],
            'category' => 'Normal',
        ],
        [
            'zScore' => ['>+1SD', '<+2SD', '+2SD', '>+2SD', '<+3SD', '+3SD'],
            'category' => 'Risiko Berat badan lebih',
        ],
    ];

    public $zScorePTBCategory = [
        [
            'zScore' => ['<-3SD'],
            'category' => 'Sangat pendek (severely stunted)',
        ],
        [
            'zScore' => ['-3SD', '>-3SD', '<-2SD'],
            'category' => 'Pendek (stunted)',
        ],
        [
            'zScore' => [
                '-2SD',
                '>-2SD',
                '<-1SD',
                '-1SD',
                '>-1SD',
                '<Median',
                'Median',
                '>Median',
                '<+1SD',
                '+1SD',
                '>+1SD',
                '<+2SD',
                '+2SD',
                '>+2SD',
                '<+3SD',
                '+3SD',
            ],
            'category' => 'Normal',
        ],
        [
            'zScore' => ['>+3SD'],
            'category' => 'Tinggi',
        ],
    ];

    public $zScoreBBPBCategory = [
        [
            'zScore' => ['<-3SD'],
            'category' => 'Gizi buruk (severely wasted)',
        ],
        [
            'zScore' => ['-3SD', '>-3SD', '<-2SD'],
            'category' => 'Gizi kurang (wasted)',
        ],
        [
            'zScore' => [
                '-2SD',
                '>-2SD',
                '<-1SD',
                '-1SD',
                '>-1SD',
                '<Median',
                'Median',
                '>Median',
                '<+1SD',
                '+1SD',
            ],
            'category' => 'Gizi baik (normal)',
        ],
        [
            'zScore' => ['>+1SD', '<+2SD', '+2SD'],
            'category' => 'Berisiko gizi lebih (possible risk of overweight)',
        ],
        [
            'zScore' => ['>+2SD', '<+3SD', '+3SD'],
            'category' => 'Gizi lebih (overweight) ',
        ],
        [
            'zScore' => ['>+3SD'],
            'category' => 'Obesitas (obese) ',
        ],
    ];

    public $zScoreIMTCategory = [
        [
            'zScore' => ['<-3SD'],
            'category' => 'Gizi buruk (severely wasted)',
        ],
        [
            'zScore' => ['-3SD', '>-3SD', '<-2SD'],
            'category' => 'Gizi kurang (wasted)',
        ],
        [
            'zScore' => [
                '-2SD',
                '>-2SD',
                '<-1SD',
                '-1SD',
                '>-1SD',
                '<Median',
                'Median',
                '>Median',
                '<+1SD',
                '+1SD',
            ],
            'category' => 'Gizi baik (normal)',
        ],
        [
            'zScore' => ['>+1SD', '<+2SD', '+2SD'],
            'category' => 'Berisiko gizi lebih (possible risk of overweight)',
        ],
        [
            'zScore' => ['>+2SD', '<+3SD', '+3SD'],
            'category' => 'Gizi lebih (overweight) ',
        ],
        [
            'zScore' => ['>+3SD'],
            'category' => 'Obesitas (obese) ',
        ],
    ];

    public $zScoreIMT5PlusCategory = [
        [
            'zScore' => ['<-3SD'],
            'category' => 'Gizi buruk (severely thinness)',
        ],
        [
            'zScore' => ['-3SD', '>-3SD', '<-2SD'],
            'category' => 'Gizi kurang (thinness)',
        ],
        [
            'zScore' => [
                '-2SD',
                '>-2SD',
                '<-1SD',
                '-1SD',
                '>-1SD',
                '<Median',
                'Median',
                '>Median',
                '<+1SD',
                '+1SD',
            ],
            'category' => 'Gizi baik (normal) ',
        ],
        [
            'zScore' => ['>+1SD', '<+2SD', '+2SD'],
            'category' => 'Gizi lebih (overweight) ',
        ],
        [
            'zScore' => ['>+2SD', '<+3SD', '+3SD'],
            'category' => 'Obesitas (obese) ',
        ],
    ];

    public function getZScoreCategory(string $zScore, $zScoreCategory): string
    {
        foreach ($zScoreCategory as $item) {
            if (is_array($item['zScore']) && in_array($zScore, $item['zScore'], true)) {
                return $item['category'];
            }
        }

        return 'Unknown';
    }

    public function getZscoreWithSign(
        float $nearest,
        float $wh,
        $index = 0,
    ): string {
        $zScoreWithSign = '';

        $zScoreIndex = $this->zScoreCode[$index] ?? '';

        if ($wh < $nearest) {
            $zScoreWithSign = "<{$zScoreIndex}";
        } elseif ($wh > $nearest) {
            $zScoreWithSign = ">{$zScoreIndex}";
        } else {
            $zScoreWithSign = $zScoreIndex;
        }

        return $zScoreWithSign;
    }

    public function getZscoreTypeOne($gender, $age) {
        return Zscore::select('min3SD', 'min2SD', 'min1SD', 'median', 'plus1SD', 'plus2SD', 'plus3SD', 'zscore_type')
            ->where('gender', $gender)
            ->where('age', $age)
            ->get();
    }

    public function getZscoreTypeTwo($gender, $age, $height) {
        return Zscore::select('min3SD', 'min2SD', 'min1SD', 'median', 'plus1SD', 'plus2SD', 'plus3SD')
            ->where('gender', $gender)
            ->where('age', $age) // 0 or 24
            ->where('height', $height)
            ->first();
    }

    public function getZscoreTypeIMT5($gender, $age, $year) {
        return Zscore::select('min3SD', 'min2SD', 'min1SD', 'median', 'plus1SD', 'plus2SD', 'plus3SD')
            ->where('gender', $gender)
            ->where('age', $age) // 1-11
            ->where('year', $year) // 5-18
            ->first();
    }

    public function getComparedValue(
        $zScoreType,
        $weight,
        $height,
    ) {
        switch ($zScoreType) {
            case 'BB':
                return $weight;
            case 'PB':
                return $height;
            case 'TB':
                return $height;
            case 'BBPB':
                return $weight;
            case 'BBTB':
                return $weight;
            case 'IMT': {
                $heightInMeters = $height / 100; //round($number, 2);
                $imt = $weight / ($heightInMeters * $heightInMeters);
                return round($imt, 2);
            }
            case 'IMT5Plus': {
                $heightInMeters = $height / 100;
                $imt = $weight / ($heightInMeters * $heightInMeters);
                return round($imt, 2);
            }
        }
        return 0;
    }

    public function getNearestSdValue($zscoreRow, $input)
    {
        $values = $this->extractSdValues($zscoreRow);
        if (count($values) === 0) {
            return null;
        }

        $input = (float) $input;
        $bestValue = null;
        $bestDiff = null;
        $key = null;

        foreach ($values as $index => $value) {
            $diff = abs($value - $input);
            if ($bestDiff === null || $diff < $bestDiff || ($diff === $bestDiff && $value > $bestValue)) {
                $bestDiff = $diff;
                $bestValue = $value;
                $key = $index;
            }
        }

        return ['nearest' => $bestValue, 'key' => $key];
    }

    public function extractSdValues($zscoreRow): array
    {
        if ($zscoreRow === null) {
            return [];
        }

        if (is_string($zscoreRow)) {
            $decoded = json_decode($zscoreRow, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                $data = $decoded;
            } else {
                return [];
            }
        } elseif (is_array($zscoreRow)) {
            $data = $zscoreRow;
        } elseif (is_object($zscoreRow)) {
            if (method_exists($zscoreRow, 'toArray')) {
                $data = $zscoreRow->toArray();
            } else {
                $data = get_object_vars($zscoreRow);
            }
        } else {
            return [];
        }

        $keys = ['min3SD', 'min2SD', 'min1SD', 'median', 'plus1SD', 'plus2SD', 'plus3SD'];
        $values = [];

        foreach ($keys as $key) {
            if (!array_key_exists($key, $data) || $data[$key] === null || $data[$key] === '') {
                continue;
            }
            $values[] = (float) $data[$key];
        }

        return $values;
    }

    public function getAgeFromBirthDate($birthDate, $asOfDate = null): array
    {
        $birth = Carbon::parse($birthDate)->startOfDay();
        $asOf = $asOfDate ? Carbon::parse($asOfDate)->startOfDay() : Carbon::now()->startOfDay();

        if ($birth->greaterThan($asOf)) {
            $totalMonths = 0;
            $years = 0;
            $months = 0;
        } else {
            $interval = $birth->diff($asOf);
            $years = (int) $interval->y;
            $months = (int) $interval->m;
            $totalMonths = ($years * 12) + $months;
        }

        // < 5 years => use months only (ex: 3y6m => 42 months)
        if ($years < 5) {
            return [
                'mode' => 'months',
                'total_months' => $totalMonths, // ex: 42
                'years' => $years,              // ex: 3
                'months' => $months,            // ex: 6
            ];
        }

        // >= 5 years => use "year + month" (ex: 5y3m)
        return [
            'mode' => 'year_month',
            'total_months' => $totalMonths,
            'years' => $years,  // ex: 5
            'months' => $months, // ex: 3
            // convenient fields for your IMT5 query shape:
            'year' => $years,   // ex: 5
            'age' => $months,   // ex: 3
        ];
    }

    public function calculateIMT5Plus($gender, $age, $year, $weight, $height) {
        $row = $this->getZscoreTypeIMT5($gender, $age, $year);
        $comparedValue = $this->getComparedValue('IMT5Plus', $weight, $height);
        $nearest = $this->getNearestSdValue($row, $comparedValue);
        $zscoreWithSign = $this->getZscoreWithSign($nearest['nearest'], $comparedValue, $nearest['key']);
        $category = $this->getZScoreCategory($zscoreWithSign, $this->zScoreIMT5PlusCategory);

        return [
            'imt_actual' => $comparedValue,
            'nearest' => $nearest['nearest'],
            'zscoreWithSign' => $zscoreWithSign,
            'category' => $category,
        ];
    }

    public function calculateAll($gender, $age, $weight, $height) {
        $roundHeight = is_float($height) && (fmod($height, 1) - 0.5) > 0.000001 ? round($height) : $height;
        $ageBBPB = $age > 23 ? 24 : 0;
        $rows = $this->getZscoreTypeOne($gender, $age);
        $rowBBPB = $this->getZscoreTypeTwo($gender, $ageBBPB, $roundHeight);
        $rowBB = null;
        $rowPTB = null;
        $rowIMT = null;
        foreach($rows as $row) {
            if ($row->zscore_type === 'BB/U') {
                $rowBB = $row;
            } elseif ($row->zscore_type === 'TB/U' || $row->zscore_type === 'PB/U') {
                $rowPTB = $row;
            } elseif ($row->zscore_type === 'IMT1' || $row->zscore_type === 'IMT2') {
                $rowIMT = $row;
            }
        }
        $comparedValueBB = $weight;
        $comparedValuePTB = $height;
        $comparedValueBBPB = $weight;
        $comparedValueIMT =  $this->getComparedValue('IMT', $weight, $height);

        $nearestBB = $this->getNearestSdValue($rowBB, $comparedValueBB);
        $nearestPTB = $this->getNearestSdValue($rowPTB, $comparedValuePTB);
        $nearestBBPB = $this->getNearestSdValue($rowBBPB, $comparedValueBBPB);
        $nearestIMT = $this->getNearestSdValue($rowIMT, $comparedValueIMT);
        $zscoreWithSignBB = $this->getZscoreWithSign($nearestBB['nearest'], $comparedValueBB, $nearestBB['key']);
        $zscoreWithSignPTB = $this->getZscoreWithSign($nearestPTB['nearest'], $comparedValuePTB, $nearestPTB['key']);
        $zscoreWithSignBBPB = $this->getZscoreWithSign($nearestBBPB['nearest'], $comparedValueBBPB, $nearestBBPB['key']);
        $zscoreWithSignIMT = $this->getZscoreWithSign($nearestIMT['nearest'], $comparedValueIMT, $nearestIMT['key']);
        $categoryBB = $this->getZScoreCategory($zscoreWithSignBB, $this->zScoreBBCategory);
        $categoryPTB = $this->getZScoreCategory($zscoreWithSignPTB, $this->zScorePTBCategory);
        $categoryBBPB = $this->getZScoreCategory($zscoreWithSignBBPB, $this->zScoreBBPBCategory);
        $categoryIMT = $this->getZScoreCategory($zscoreWithSignIMT, $this->zScoreIMTCategory);

        return [
            'BB' => [
                'nearest' => $nearestBB['nearest'],
                'zscoreWithSign' => $zscoreWithSignBB,
                'category' => $categoryBB,
            ],
            'PTB' => [
                'nearest' => $nearestPTB['nearest'],
                'zscoreWithSign' => $zscoreWithSignPTB,
                'category' => $categoryPTB,
            ],
            'BBPB' => [
                'nearest' => $nearestBBPB['nearest'],
                'zscoreWithSign' => $zscoreWithSignBBPB,
                'category' => $categoryBBPB,
            ],
            'IMT' => [
                'imt_actual' => $comparedValueIMT,
                'nearest' => $nearestIMT['nearest'],
                'zscoreWithSign' => $zscoreWithSignIMT,
                'category' => $categoryIMT,
            ]
        ];
        
    }

    public function getChartDataByAge($gender, $ages, $zscoreType) {
        return Zscore::select('min3SD', 'min2SD', 'min1SD', 'median', 'plus1SD', 'plus2SD', 'plus3SD')
            ->where('gender', $gender)
            ->where('zscore_type', $zscoreType)
            ->whereIn('age', $ages)
            ->get();
    }
}