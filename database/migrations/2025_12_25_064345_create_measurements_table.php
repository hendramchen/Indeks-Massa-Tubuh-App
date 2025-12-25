<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('measurements', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('age')->nullable(); // age
            $table->tinyInteger('years')->nullable(); // year
            $table->tinyInteger('months')->nullable(); // month
            $table->float('weight', 3, 2);
            $table->float('height', 3, 2);
            $table->string('weight_nearest')->nullable();
            $table->string('weight_zscore')->nullable();
            $table->string('weight_category')->nullable();
            $table->string('height_nearest')->nullable();
            $table->string('height_zscore')->nullable();
            $table->string('height_category')->nullable();
            $table->string('wh_nearest')->nullable();
            $table->string('wh_zscore')->nullable();
            $table->string('wh_category')->nullable();
            $table->string('imt_actual')->nullable();
            $table->string('imt_nearest')->nullable();
            $table->string('imt_zscore')->nullable();
            $table->string('imt_category')->nullable();
            $table->date('note_date')->nullable();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('child_info_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('measurements');
    }
};
