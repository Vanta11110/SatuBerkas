<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $pendudukId = $request->input('penduduk_id');
    $year = $request->input('year');
    $month = $request->input('month');
    $jenisSurat = $request->input('jenisSurat');
    $pages = $request->input('Paginate');

    $query = File::query();

    if ($pendudukId) {
        $query->where('penduduk_id', $pendudukId);
    }
    if ($year) {
            $query->whereYear('created_at', $year);
        }

    if ($month) {
        $query->whereMonth('created_at', $month);
    }

    if ($jenisSurat) {
        $query->where('jenis_surat', $jenisSurat);
    }

    $files = $query->orderBy('created_at')->paginate($pages);

    return response()->json($files);
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->hasFile('file')) {
            $pendudukId = $request->input('pendudukId');
            $jenisSurat = $request->input('jenisSurat');

            $request->validate([
                'file' => 'required|mimes:pdf',
            ]);

            // Simpan file sesuai dengan ID penduduk dan jenis surat
            $file = $request->file('file');
            $timestamp = now()->timestamp; // Generate timestamp
            $filePath = "surat_{$pendudukId}_{$jenisSurat}_{$timestamp}.pdf";
            $fileName = "surat_{$jenisSurat}_{$timestamp}.pdf";
            $file->storeAs('surat', $filePath);

            $fileModel = new File();
            $fileModel->penduduk_id = $pendudukId;
            $fileModel->jenis_surat = $jenisSurat;
            $fileModel->nama_surat = $fileName;
            $fileModel->file_path = $filePath;
            $fileModel->save();

            return response()->json(['message' => 'File uploaded successfully']);
        }

        return response()->json(['message' => 'File not provided'], 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        File::find($file);

        return response()->json($file);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, File $file)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        $file->delete();
        return response()->json(true);
    }

    public function getTotalSurat()
{
    $totalSurat = File::count();

    return response()->json(['totalSurat' => $totalSurat]);
}
public function getTotalSuratNow() {
        $now = now();
        $totalSuratNow = File::whereYear('created_at', $now->year)
            ->whereMonth('created_at', $now->month)
            ->count();

        return response()->json(['totalSurat' => $totalSuratNow]);
    }
    public function showFile($file_path)
{
    $file = storage_path("app/surat/{$file_path}");
    $type = 'application/pdf';
    
    if (file_exists($file)) {
        return response()->file($file, ['Content-Type' => $type ]);
    } else {
        abort(404);
    }
}
public function getSoftDeletedData()
{
    $softDeletedData = File::onlyTrashed()->get();
    return response()->json($softDeletedData);
}

public function restore($id)
    {
        $softDeletedData = File::onlyTrashed()->find($id);
        
        if ($softDeletedData) {
            $softDeletedData->restore();

            return response()->json([
                'message' => 'Data berhasil direstore',
            ]);
        }

        return response()->json([
            'message' => 'Data tidak ditemukan',
        ], 404);
    }
}
