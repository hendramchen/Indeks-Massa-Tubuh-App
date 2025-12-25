<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Measurement extends Model
{
    protected $fillable = [
        'age',
        'years',
        'months',
        'weight',
        'height',
        'weight_nearest',
        'weight_zscore',
        'weight_category',
        'height_nearest',
        'height_zscore',
        'height_category',
        'wh_nearest',
        'wh_zscore',
        'wh_category',
        'imt_actual',
        'imt_nearest',
        'imt_zscore',
        'imt_category',
        'note_date',
        'user_id',
        'child_info_id'
    ];

    public function childInfo(): BelongsTo
    {
        return $this->belongsTo(ChildInfo::class);
    }
}
