<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ParentInfo extends Model
{
    protected $fillable = ['name', 'phone', 'province', 'city', 'district', 'address'];
}
