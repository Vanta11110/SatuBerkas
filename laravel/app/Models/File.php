<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class File extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $dates = ['deleted_at'];
    protected $fillable = [
        'penduduk_id',
        'jenis_surat',
        'nama_surat',
        'file_path',
        'deleted_at',
    ];
    protected $appends = ['is_permanent'];

    public function penduduk()
    {
        return $this->belongsTo(Penduduk::class, 'penduduk_id');
    }

    public function getIsPermanentAttribute()
    {
        return $this->deleted_at && $this->deleted_at->diffInDays(now()) > 30;
    }

    
}
