<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImtResult extends Model
{
    protected $fillable = [
        'parent_name',
        'child_name',
        'gender',
        'age',
        'year',
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
        'imt_nearest',
        'imt_zscore',
        'imt_category',
        'province',
        'city',
        'district',
        'address',
        'user_id',
    ];
}
