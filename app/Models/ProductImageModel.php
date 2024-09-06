<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\UploadedFile;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Log;

class ProductImageModel extends Model
{
    use HasFactory;
    protected $table = 'product_image';
    const NOMBRE_ARCHIVO = "nombre_archivo";
    const URL = "url";
    const ARCHIVO = 'archivo';
    const FOTO_ID = "foto_id";

    protected $fillable = [
        self::NOMBRE_ARCHIVO,
        self::URL
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(ProductModel::class, 'id', 'foto_id');
    }

    public static function processImage(UploadedFile $file): array | false
    {
        try {
            $extension = $file->getClientOriginalExtension();
            $filename = time() . "_" . uniqid() . ".$extension";

            $path = $file->storeAs('files', $filename, 'local');
            return [
                self::NOMBRE_ARCHIVO => $filename,
                self::URL => $path
            ];
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return false;
        }
    }
}
