<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\News;
use App\Models\User;
use App\Models\Image;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        if (!$user) {
            return;
        }

        $title = 'First News Post';

        News::create([
            'user_id'     => $user->id,
            'title'       => $title,
            'subtitle'    => 'Subtitle example',
            'description' => 'Short description text...',
            'slug'        => $this->generateDateSlug($title),
            'image_id'    => Image::inRandomOrder()->value('id'),
        ]);

        News::factory()
            ->count(5)
            ->create([
                'user_id' => $user->id,
            ])
            ->each(function ($news) {
                $news->update([
                    'slug'     => $this->generateDateSlug($news->title),
                    'image_id' => Image::inRandomOrder()->value('id'),
                ]);
            });
    }

    private function generateDateSlug(string $title): string
    {
        return date('Y-m-d') . '-' . Str::slug($title);
    }
}
