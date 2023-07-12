<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;
    // assign in massive way the fields 
    protected $fillable = [
        'user_id',
        'game_id',
        'game_name',
        'max_seats_available'
    ];

    protected $casts = [
        'closed_at' => 'datetime'
    ];

    public function user() 
    {
        return $this->belongsTo(User::class);
    }
}
