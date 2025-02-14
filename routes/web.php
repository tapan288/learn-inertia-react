<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function (Request $request) {
    return Inertia::render('Dashboard', [
        // 'notifications' => Inertia::merge(function () {
        //     if (!session()->has('notification')) {
        //         return null;
        //     }

        //     return [session()->get('notification')];
        // }),
        'datetime' => Inertia::optional(function () use ($request) {
            sleep($request->get('delay', 0));
            return now()->format('Y-m-d H:i:s');
        }),
    ]);
})
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::post('notification', function () {
    session()->flash('notification', str()->random(10));
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('posts', PostController::class);
});

require __DIR__ . '/auth.php';
