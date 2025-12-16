<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChildInfo extends Model
{
    protected $fillable = ['name', 'gender', 'birth_date', 'parent_info_id'];
    
    public function parent()
    {
        return $this->belongsTo(ParentInfo::class);
    }
}
