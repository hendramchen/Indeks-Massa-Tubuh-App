<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\ImtResultController;
use App\Http\Controllers\ZscoreController;
use App\Http\Controllers\ChildInfoController;
use App\Http\Controllers\ParentInfoController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::post('/result', [CalculatorController::class, 'result'])->name('result');
Route::get('/tabel-zscore', [ZscoreController::class, 'index'])->name('tabel-zscore');

Route::middleware(['auth'])->group(function () {
    Route::post('/imt-result', [ImtResultController::class, 'store'])->name('imt-result.store');
    Route::get('/imt-result', [ImtResultController::class, 'index'])->name('imt-result.index');
    Route::get('/imt-result/{id}', [ImtResultController::class, 'show'])->name('imt-result.show');
    Route::resource('child-info', ChildInfoController::class);
    Route::resource('parent-info', ParentInfoController::class);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [ImtResultController::class, 'index'])->name('dashboard');
    // Route::get('dashboard', function () {
    //     $user = auth()->user();
    //     if ($user->role == 'admin') {
    //         return Inertia::render('dashboard');
    //     }
    //     return Inertia::render('history');
    // })->name('dashboard');
});

require __DIR__.'/settings.php';
