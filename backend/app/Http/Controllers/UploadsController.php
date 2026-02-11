<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadsController extends Controller
{
    /**
     * Fetch image details by ID
     * GET /api/uploads?image_id=1
     */
    public function index(Request $request)
    {
        $request->validate([
            'image_id' => ['required', 'integer', 'exists:images,id'],
        ]);

        $image = Image::findOrFail($request->query('image_id'));

        return response()->json($image, 200);
    }

    /**
     * Handle image uploads (avatar or news)
     * POST /api/uploads
     */
    public function create(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        // Proper validation (matches frontend + logic)
        $validatedData = $request->validate([
            'files'     => ['required', 'array', 'max:5'],
            'files.*'   => ['required', 'file', 'image', 'max:10240'], // 10MB
            'type'      => ['required', 'in:avatar,news'],
            'news_id'   => ['nullable', 'integer', 'exists:news,id'],
            'title'     => ['nullable', 'string', 'max:255'],
        ], [
            'files.*.max' => 'Each file may not exceed 10 MB.',
            'files.max'   => 'You may not upload more than 5 files.',
        ]);

        $uploadedImages = [];
        $type = $validatedData['type'];

        Log::info("Uploading {$type} image(s) for user {$user->username}");

        foreach ($request->file('files') as $file) {
            $originalFilename = $file->getClientOriginalName();
            $filename = pathinfo($originalFilename, PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();

            // Clean filename
            $cleanFilename = preg_replace('/[^A-Za-z0-9\-_]/', '_', $filename);

            // Unique filename
            $uniqueFilename = $cleanFilename . '_' . Str::random(16) . '.' . $extension;
            $relativePath = "uploads/{$user->username}/{$uniqueFilename}";

            // Store file
            $file->storeAs("uploads/{$user->username}", $uniqueFilename, 'public');

            // Public URL
            $publicUrl = url(Storage::url($relativePath));

            // Create DB record
            $image = Image::create([
                'url'     => $publicUrl,
                'name'    => $validatedData['title'] ?? $originalFilename,
                'user_id' => $user->id,
                'news_id' => $type === 'news' ? ($validatedData['news_id'] ?? null) : null,
            ]);

            // Avatar logic
            if ($type === 'avatar') {
                $user->update(['avatar_id' => $image->id]);
            }

            $uploadedImages[] = $image;
        }

        return response()->json(['images' => $uploadedImages], 201);
    }

    /**
     * Delete an image
     * DELETE /api/uploads/{id}
     */
    public function destroy($id)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $image = Image::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        // Extract relative path from storage URL
        $relativePath = str_replace('/storage/', '', parse_url($image->url, PHP_URL_PATH));

        if (Storage::disk('public')->exists($relativePath)) {
            Storage::disk('public')->delete($relativePath);
        }

        $image->delete();

        return response()->json([
            'deleted' => true,
            'id' => $id,
        ], 200);
    }
}
