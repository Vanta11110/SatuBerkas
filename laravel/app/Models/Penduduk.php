<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penduduk extends Model
{
    use HasFactory;

    protected $table = 'penduduk';

    protected $fillable = [
        'nama',
        'nik',
        'no_kk',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'rt',
        'kelurahan',
        'pekerjaan',
        'status_perkawinan',
        'pendidikan_terakhir',
        'agama',
        'ayah',
        'ibu',
    ];
    protected $rules = [
    'nama' => 'required|alpha|max:255',
    'nik' => 'required|numeric|size:16|unique:penduduk,nik',
    'no_kk' => 'required|numeric|size:16|unique:penduduk,no_kk',
    'tanggal_lahir' => 'required|date',
    'jenis_kelamin' => 'required|in:Laki-Laki,Perempuan',
    'alamat' => 'required|string',
    'rt' => 'required|numeric',
    'kelurahan' => 'required|string',
    'pekerjaan' => 'required|string',
    'status_perkawinan' => 'required|in:Kawin,Belum Kawin',
    'pendidikan_terakhir' => 'required|in:Tidak Bersekolah, TK, SD, SMP, SMA, D3, S1, S2, S3',
    'agama' => 'required|in:Islam, Kristen, Katolik, Hindu, Buddha, Khonghucu',
    'ayah' => 'required|alpha',
    'ibu' => 'required|alpha',
];

}
