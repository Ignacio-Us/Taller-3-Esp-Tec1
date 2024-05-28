<template>
    <nav class="navbar navbar-expand-lg shadow-lg bg-custom">
        <div class="col-md-3 p-2 ml">
            <!--Player 1-->
            <h5 v-if="showPlayerOne" class="text-white">Jugador 1</h5>
        </div>

        <!--Paginas-->
        <div class="col-md-6 text-center p-2">
            <button class="btn fs-6 text-white">Home</button>
            <button class="btn fs-6 text-white">Scores</button>
        </div>
        <div class="col-md-2 p-2">
            <div v-if="!showPlayerTwo">
                <button @click="showPopover = !showPopover" class="btn btn-light">Iniciar sesion</button>
            </div>

            <!--Popover-->
            <div v-if="showPopover" class="shadow-lg popover">
                <div class="p-2 bg-custom rounded-3 border-white">
                    <p>
                        <button @click="showPlayerOne = !showPlayerOne" class="btn btn-light">Player 1</button>
                    </p>
                    <p>
                        <button @click="showPlayerTwo = !showPlayerTwo" class="btn btn-light">Player 2</button>
                    </p>
                </div>
            </div>
            <!--Player 2-->
            <p v-if="showPlayerTwo" class="text-white">Jugador 2</p>
        </div>


    </nav>
</template>

<style scoped>
.bg-custom {
    background-color: #1E5128;
}

.ml {
    margin-left: 12px;
}

.popover {
    position: absolute;
    border: 2px solid white;
    margin: 15px 25px;
    z-index: 999;
    border-radius: 10px;
}

button {
    font-family: 'Press Start 2P', sans-serif;
    font-size: small;
}
</style>

<script setup>
import { ref } from 'vue';

const showPopover = ref(false);
const showPlayerOne = ref(false);
const showPlayerTwo = ref(false);
</script>