<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\File;
use App\Models\Penduduk;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\File>
 */
class FileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = File::class;
    public function definition(): array
    {
        Penduduk::factory(5)->create();
        return [
            'penduduk_id' => function () {
                // Retrieve a random penduduk_id from the Penduduk model
                return Penduduk::inRandomOrder()->first()->id;
            },
            'jenis_surat' => $this->faker->word,
            'nama_surat' => $this->faker->word,
            'file_path' => $this->faker->word . '.' . $this->faker->fileExtension,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
