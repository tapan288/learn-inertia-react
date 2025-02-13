<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use App\Http\Requests\StorePostRequest;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->latest()->get();

        return Inertia::render('Posts/Index', [
            'posts' => Inertia::defer(function () use ($posts) {
                sleep(1);
                return PostResource::collection($posts);
            }, 'first'),
            'morePosts' => Inertia::defer(function () use ($posts) {
                sleep(1);
                return PostResource::collection($posts);
            }, 'second'),
            'evenMorePosts' => Inertia::defer(function () use ($posts) {
                sleep(1);
                return PostResource::collection($posts);
            }, 'second'),
            'postsCount' => function () use ($posts) {
                sleep(2);
                return $posts->count();
            },
        ]);
    }

    public function store(StorePostRequest $request)
    {
        auth()->user()->posts()->create(
            $request->validated(),
        );

        return redirect()->route('posts.index')
            ->with('success', 'Post created successfully.');
    }
}
