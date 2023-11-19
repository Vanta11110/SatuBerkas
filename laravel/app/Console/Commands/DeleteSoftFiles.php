<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\File;
use Carbon\Carbon;

class DeleteSoftFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'delete:soft';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Soft delete files older than 30 days';
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $files = File::onlyTrashed()->get();

        foreach ($files as $file) {
            $deletedTime = $file->deleted_at;
            $now = Carbon::now();
            $daysDiff = $now->diffInDays($deletedTime);

            if ($daysDiff >= 30) {
                $file->forceDelete();
            }
        }
    }
}
