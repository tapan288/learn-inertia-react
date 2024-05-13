<?php

namespace App\Http\Middleware;

use App\Models\Post;
use Inertia\Middleware;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'message' => collect(Arr::only(
                $request->session()->all(),
                ['success', 'error']
            )
            )->mapWithKeys(function ($body, $type) {
                return [
                    'type' => $type,
                    'body' => $body
                ];
            }),
            'can' => [
                'post_create' => $user && $user->can('create', Post::class)
            ],
        ];
    }
}
