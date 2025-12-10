<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'admin@sigizi.org'],
            [
                'name' => 'Administrator',
                'password' => 'password',
                'role' => 'user',
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            ZscoreBBMaleSeeder::class,
            ZscorePBMaleSeeder::class,
            ZscoreTBMaleSeeder::class,
            ZscoreBBPBMaleSeeder::class,
            ZscoreBBTBMaleSeeder::class,
            ZscoreIMT1MaleSeeder::class,
            ZscoreIMT2MaleSeeder::class,
            ZscoreIMT5MaleSeeder::class,
            ZscoreBBFemaleSeeder::class,
            ZscorePBFemaleSeeder::class,
            ZscoreTBFemaleSeeder::class,
            ZscoreBBPBFemaleSeeder::class,
            ZscoreBBTBFemaleSeeder::class,
            ZscoreIMT1FemaleSeeder::class,
            ZscoreIMT2FemaleSeeder::class,
            ZscoreIMT5FemaleSeeder::class,
        ]);
    }
}
