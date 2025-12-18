<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChildInfo extends Model
{
    protected $fillable = ['name', 'gender', 'birth_date', 'parent_info_id'];
    
    public function parentInfo():BelongsTo
    {
        return $this->belongsTo(ParentInfo::class);
    }
}
