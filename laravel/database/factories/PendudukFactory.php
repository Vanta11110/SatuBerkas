<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Penduduk>
 */
class PendudukFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'nama' => $this->faker->name,
        'nik' => $this->faker->unique()->numerify('################'),
        'no_kk' => $this->faker->unique()->numerify('################'),
        'tanggal_lahir' => $this->faker->date,
        'jenis_kelamin' => $this->faker->randomElement(['Laki-laki', 'Perempuan']),
        'alamat' => $this->faker->address,
        'rt' => $this->faker->numberBetween(1, 30),
        'kelurahan' => $this->faker->city,
        'pekerjaan' => $this->faker->jobTitle,
        'status_perkawinan' => $this->faker->randomElement(['Kawin', 'Belum Kawin', 'Duda', 'Janda']),
        'pendidikan_terakhir' => $this->faker->randomElement(['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3']),
        'agama' => $this->faker->randomElement(['Islam', 'Kristen', 'Hindu', 'Buddha', 'Konghucu']),
        'ayah' => $this->faker->name('male'),
        'ibu' => $this->faker->name('female'),
        ];
    }
}
