<?php

namespace App\Http\Controllers;

use App\Models\Penduduk;
use Illuminate\Http\Request;

class PendudukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $rt = $request->input('RT');
        $pages = $request->input('Paginate');
        $filter = $request->input('filterInput');
        $query = Penduduk::query();
        if ($rt) {$query->where('RT', $rt);}
        if ($filter) {
        $query->where(function ($q) use ($filter) {
            $q->where('nama', 'like', '%' . $filter . '%')
                ->orWhere('nik', 'like', '%' . $filter . '%')
                ->orWhere('no_kk', 'like', '%' . $filter . '%');
        });
    }

        $penduduk = $query->orderBy('nama')->paginate($pages);
        return response()->json($penduduk);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        Penduduk::create([
            'nama' => $request->nama,
            'nik' => $request->nik,
            'no_kk' => $request->no_kk,
            'tanggal_lahir' => $request->tanggal_lahir,
            'jenis_kelamin' => $request->jenis_kelamin,
            'alamat' => $request->alamat,
            'rt' => $request->rt,
            'kelurahan' => $request->kelurahan,
            'pekerjaan' => $request->pekerjaan,
            'status_perkawinan' => $request->status_perkawinan,
            'pendidikan_terakhir' => $request->pendidikan_terakhir,
            'agama' => $request->agama,
            'ayah' => $request->ayah,
            'ibu' => $request->ibu,
        ]);
        return response()->json(true);
    }

    /**
     * Display the specified resource.
     */
    public function show(Penduduk $penduduk)
    {
        Penduduk::find($penduduk);        

        return response()->json($penduduk);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Penduduk $penduduk)
    {
        $penduduk->nama = $request->nama;
        $penduduk->nik = $request->nik;
        $penduduk->no_kk = $request->no_kk;
        $penduduk->tanggal_lahir = $request->tanggal_lahir;
        $penduduk->jenis_kelamin = $request->jenis_kelamin;
        $penduduk->alamat = $request->alamat;
        $penduduk->rt = $request->rt;
        $penduduk->kelurahan = $request->kelurahan;
        $penduduk->pekerjaan = $request->pekerjaan;
        $penduduk->status_perkawinan = $request->status_perkawinan;
        $penduduk->pendidikan_terakhir = $request->pendidikan_terakhir;
        $penduduk->agama = $request->agama;
        $penduduk->ayah = $request->ayah;
        $penduduk->ibu = $request->ibu;

        $penduduk->save();
        return response()->json(true);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Penduduk $penduduk)
    {
        $penduduk->delete();
        return response()->json(true);
    }

    public function getTotalPendudukCount()
{
    $totalPenduduk = Penduduk::count();

    return response()->json(['totalPenduduk' => $totalPenduduk]);
}
}
