<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detailbilling extends Model
{
    use HasFactory;

    protected $table = "detail_bill";

    protected $fillable = ['item_description','quantity','total_und', 'total', 'billing_id'];
}
