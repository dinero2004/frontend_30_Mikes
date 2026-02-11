<?php

namespace Database\Factories;

use App\Models\News;
use Illuminate\Database\Eloquent\Factories\Factory;

class NewsFactory extends Factory
{
    protected $model = News::class;

    public function definition()
    {
        return [
            'user_id'     => 1,
            'title'       => $this->faker->sentence,
            'subtitle'    => $this->faker->sentence,
            'slug'        => date('Y-m-d') . '-' . \Illuminate\Support\Str::slug($this->faker->sentence),
            'description' => $this->faker->paragraph,
            'image_url'   => $this->faker->imageUrl(),
        ];
    }
}
