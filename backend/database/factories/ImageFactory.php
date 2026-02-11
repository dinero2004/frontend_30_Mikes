<?php

namespace Database\Factories;

use App\Models\Image;
use App\Models\User;
use App\Models\News;
use Illuminate\Database\Eloquent\Factories\Factory;

class ImageFactory extends Factory
{
    protected $model = Image::class;

    public function definition(): array
    {
        return [
            'url' => $this->faker->unique()->imageUrl(800, 600, 'news', true),
            'name' => $this->faker->words(3, true),
            'user_id' => User::inRandomOrder()->value('id'),
            'news_id' => News::inRandomOrder()->value('id'),
        ];
    }
}
