<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ParentInfo extends Model
{
    protected $fillable = ['name', 'phone', 'province', 'city', 'district', 'address'];

    public function children(): HasMany
    {
        return $this->hasMany(ChildInfo::class);
    }
}
