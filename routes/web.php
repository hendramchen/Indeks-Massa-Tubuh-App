<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\ImtResultController;
use App\Http\Controllers\ZscoreController;
use App\Http\Controllers\ChildInfoController;
use App\Http\Controllers\ParentInfoController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\ProvinceController;

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
    Route::resource('children', ChildInfoController::class);
    Route::resource('parents', ParentInfoController::class);

    // Route::get('/parents', [ParentInfoController::class, 'index'])->name('parents.index');
    // Route::get('/parents/{id}', [ParentInfoController::class, 'show'])->name('parents.show');
    Route::get('/parent_data', [ParentInfoController::class, 'getParents'])->name('parents.data');
    Route::get('/child_data', [ChildInfoController::class, 'getChildren'])->name('children.data');
    Route::get('/chart_data', [ChildInfoController::class, 'getChartDataBB'])->name('chart.data');
    Route::post('/calculate/{childId}', [ChildInfoController::class, 'calculate'])->name('calculate');

    Route::post('/city', [CityController::class, 'store'])->name('city.store');
    Route::get('/city', [CityController::class, 'index'])->name('city.index');
    Route::post('/district', [DistrictController::class, 'store'])->name('district.store');
    Route::get('/district', [DistrictController::class, 'index'])->name('district.index');
    Route::post('/province', [ProvinceController::class, 'store'])->name('province.store');
    Route::get('/province', [ProvinceController::class, 'index'])->name('province.index');
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
