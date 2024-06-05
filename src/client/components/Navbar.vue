<template>
    <nav class="navbar navbar-expand-lg shadow-lg bg-custom">
        <div class="col-md-3 p-2 ml-1">
            <button v-if="!showPlayerOne" @click="showPlayerOne = !showPlayerOne" class="btn btn-light fs-5">Iniciar Player 1</button>
            
            <!--Player 1-->
            <h5 v-if="showPlayerOne" class="text-white">Jugador 1</h5>
        </div>

        <!--Paginas-->
        <div class="col-md-6 text-center">
            <RouterLink to="/" class="btn fs-4 text-white font-custom">Home</RouterLink>
            <RouterLink to="/selection" class="btn fs-4 text-white font-custom">Game</RouterLink>
            <button class="btn fs-4 text-white">Scores</button>
        </div>
        <div class="col-md-2 p-2 ml-2">
            <button v-if="!showPlayerTwo" @click="showPlayerTwo = !showPlayerTwo" class="btn btn-light fs-5">Iniciar Player 2</button>
            
            <!--Player 2-->
            <h5 v-if="showPlayerTwo" class="text-white">Jugador 2</h5>
        </div>


    </nav>
</template>

<style scoped>
.bg-custom {
    background-color: #1E5128;
}

.ml-1 {
    margin-left: 12px;
}

.ml-2{
    margin-left: 5%;
}

.popover {
    position: absolute;
    border: 2px solid white;
    margin: 15px 25px;
    z-index: 999;
    border-radius: 10px;
}

button {
    font-family: "Planes_ValMore", sans-serif;
    font-size: small;
}

.font-custom {
    font-family: "Planes_ValMore", sans-serif;
    font-size: small;
}
</style>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const showPlayerOne = ref(false);
const showPlayerTwo = ref(false);
</script>