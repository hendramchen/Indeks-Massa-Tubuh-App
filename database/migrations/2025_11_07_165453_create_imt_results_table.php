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
            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('child_name');
            $table->tinyInteger('age')->unsigned();
            $table->enum('gender', ['male', 'female']);
            $table->float('weight', 3, 2);
            $table->float('height', 3, 2);
            $table->float('weight_by_age', 3, 2);
            $table->float('height_by_age', 3, 2);
            $table->float('weight_by_height', 3, 2);
            $table->float('imt_by_age', 3, 2);
            $table->string('desa')->nullable();
            $table->string('banjar')->nullable();
            $table->string('kecamatan')->nullable();
            $table->string('kabupaten')->nullable();
            $table->string('provinsi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imt_result');
    }
};
