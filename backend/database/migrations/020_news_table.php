<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
      public function up()
      {
            Schema::create('news', function (Blueprint $table) {
                  $table->id();
                  $table->foreignId('user_id')->constrained()->onDelete('cascade');
                  $table->foreignId('image_id')->nullable()->constrained('images')->nullOnDelete();
                  $table->string('title');
                  $table->string('slug')->unique(); // Add the slug column here
                  $table->string('subtitle')->nullable();
                  $table->text('description')->nullable();
                  $table->string('image_url')->nullable();
                  $table->timestamps();
            });
      }

      public function down()
      {
            Schema::dropIfExists('news');
      }
};