<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    // GET /api/news
   public function index()
{
    return News::latest()->paginate(10);
}


    // GET /api/news/{id}
    public function show($id)
    {
        return response()->json(
            News::findOrFail($id)
        );
    }

    // POST /api/news
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id'     => 'nullable|exists:users,id',
            'title'       => 'required|string|max:255',
            'subtitle'    => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_url'   => 'nullable|string|max:255'
        ]);

        return response()->json(
            News::create($data),
            201
        );
    }

    // PUT / PATCH /api/news/{id}
    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $data = $request->validate([
            'title'       => 'sometimes|string|max:255',
            'subtitle'    => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'image_url'   => 'sometimes|string|max:255',
            'user_id'     => 'nullable|exists:users,id'
        ]);

        $news->update($data);

        return response()->json($news);
    }

    // DELETE /api/news/{id}
    public function destroy($id)
    {
        News::findOrFail($id)->delete();

        return response()->json(['message' => 'News deleted']);
    }
}
