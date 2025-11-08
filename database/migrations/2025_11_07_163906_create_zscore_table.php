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
        Schema::create('zscore', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('age')->unsigned();
            $table->float('min3SD', 3, 2);
            $table->float('min2SD', 3, 2);
            $table->float('min1SD', 3, 2);
            $table->float('median', 3, 2);
            $table->float('plus1SD', 3, 2);
            $table->float('plus2SD', 3, 2);
            $table->float('plus3SD', 3, 2);
            $table->string('zscore_type');
            $table->enum('gender', ['male', 'female']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zscore');
    }
};
