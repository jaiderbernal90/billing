<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailbillTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail_bill', function (Blueprint $table) {
            $table->increments("id");
            $table->string("item_description",255);
            $table->integer("quantity");
            $table->decimal("total_und",10,2);
            $table->decimal("total",10,2);
            $table->integer('billing_id')->unsigned()->nullable();
            $table->foreign('billing_id')->references('id')->on('billing')->onDelete('cascade');
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
        Schema::dropIfExists('detail_bill');
    }
}
