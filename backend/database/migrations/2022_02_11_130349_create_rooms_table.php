<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(); //questo campo va a collegare ogni utente che ha creato la stanza
            $table->unsignedInteger('gname_id');
            $table->string('game_name');
            $table->unsignedInteger('seats')->default(0);
            $table->unsignedInteger('max_seats_available');
            $table->datetime('closed_at')->nullable(); //evaluate if the room is active or not
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
        Schema::dropIfExists('rooms');
    }
};
