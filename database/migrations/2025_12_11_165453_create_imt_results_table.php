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
        Schema::create('imt_results', function (Blueprint $table) {
            $table->id();
            // $table->string('parent_name')->nullable();
            // $table->string('child_name');
            // $table->enum('gender', ['male', 'female']);
            $table->tinyInteger('age')->nullable(); // month
            $table->tinyInteger('year')->nullable(); // year
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
            $table->string('imt_nearest')->nullable();
            $table->string('imt_zscore')->nullable();
            $table->string('imt_category')->nullable();
            $table->date('note_date')->nullable();
            // $table->string('province')->nullable();
            // $table->string('city')->nullable();
            // $table->string('district')->nullable();
            // $table->string('address')->nullable();
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
        Schema::dropIfExists('imt_results');
    }
};
