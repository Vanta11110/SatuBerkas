<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\PendudukController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/soft-delete', function () {
    Artisan::call('delete:soft');
    return 'Soft delete command has been executed.';
});


Route::apiResource('/penduduk', PendudukController::class);
Route::get('/total-penduduk-count', [PendudukController::class, 'getTotalPendudukCount']);
Route::get('/total-surat-count', [FileController::class, 'getTotalSurat']);
Route::get('/total-suratNow-count', [FileController::class, 'getTotalSuratNow']);
Route::get('/total-admin-count', [UserController::class, 'getTotalAdmin']);
Route::get('/berkas/{file_path}', [FileController::class, 'showFile']);
Route::apiResource('/file', FileController::class);
Route::apiResource('/admin', UserController::class);
Route::get('/soft-deleted-data', [FileController::class,'getSoftDeletedData']);
Route::post('/restore/{id}', [FileController::class,'restore']);
