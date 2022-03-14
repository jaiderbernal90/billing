<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Billing extends Model
{
    use HasFactory;

    protected $table = "billing";

    protected $fillable = ['number_bill','full_name_emitter','nit_emitter', 'full_name_purchaser', 'nit_purchaser', 'subtotal', 'iva','total'];
}
