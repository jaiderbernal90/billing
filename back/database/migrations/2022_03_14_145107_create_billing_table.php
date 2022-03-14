<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBillingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('billing', function (Blueprint $table) {
            $table->increments("id");
            $table->string("number_bill",100)->unique();
            $table->string("full_name_emitter",100);
            $table->string("nit_emitter",15);
            $table->string("full_name_purchaser",100);
            $table->string("nit_purchaser",15);
            $table->decimal("subtotal",10,2);
            $table->decimal("iva",10,2);
            $table->decimal("total",10,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('billing');
    }
}
