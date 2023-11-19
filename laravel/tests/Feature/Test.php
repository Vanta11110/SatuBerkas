<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Penduduk;
use App\Models\File;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    public function testGetTotalPendudukCount()
    {
        $this->actingAs(User::factory()->create());

        Penduduk::factory(5)->create();

        $response = $this->get('/api/total-penduduk-count');

        $response->assertStatus(200)
                 ->assertJson(['totalPenduduk' => 5]);
    }

    public function testGetTotalSuratCount()
    {
        $this->actingAs(User::factory()->create());

        File::factory(3)->create();

        $response = $this->get('/api/total-surat-count');

        $response->assertStatus(200)
                 ->assertJson(['totalSurat' => 3]);
    }
}
