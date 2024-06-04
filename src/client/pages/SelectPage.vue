<template>
    <Navbar />
    <div class="col-10 justify-content-center align-items-center m-auto">

        <!-- Personaje Jugador 1-->
        <div class="col-md-3 mt-5">
            <h5 class="text-white text-center font-custom">
                Seleccione un personaje
                <br>
                Jugador 1
            </h5>
            <div class="row mt-5">
                <div class="col-md-2 p-5">
                    <button @click="prev()" class="btn text-white border-2 border-white"> < </button>
                </div>

                <div class="col-md-4">
                    <div class="carousel">
                        <Transition>
                            <img :src="state" :key="state" />
                        </Transition>
                    </div>
                </div>

                <div class="col-md-2 pt-5">
                    <button @click="next()" class="btn text-white border-2 border-white"> > </button>
                </div>
            </div>
        </div>

        <!--Selecctor de musica-->
        <div class="col-md-12">
            <div class="row justify-content-center">
                <div class="col-sm-1">
                    <button @click="selectMusic('musica1')" class="btn btn-success">Música 1</button>
                </div>

                <div class="col-sm-1">
                    <button @click="selectMusic('musica2')" class="btn btn-success">Música 2</button>
                </div>

                <div class="col-sm-1">
                    <button @click="selectMusic('musica3')" class="btn btn-success">Música 3</button>
                </div>
            </div>
        </div>

        <div>
            <button class="btn btn-light">Play</button>
        </div>
    </div>
</template>

<style scoped>
.carousel {
    position: relative;
    height: 100px;
}

img {
    width: 100%;
    height: 100px;
    position: absolute;
    object-fit: cover;
}

.v-enter-active,
.v-leave-active {
    transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>

<script setup>
import Navbar from '../components/Navbar.vue';
import character1 from '../assets/game assets/free-pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster.png';
import character2 from '../assets/game assets/free-pixel-art-tiny-hero-sprites/2 Owlet_Monster/Owlet_Monster.png';
import character3 from '../assets/game assets/free-pixel-art-tiny-hero-sprites/3 Dude_Monster/Dude_Monster.png';

import { useCycleList } from '@vueuse/core';
import { ref } from 'vue'

const { state, next, prev } = useCycleList([
    character1,
    character2,
    character3
]);


const selectMusic = (music) =>{
    switch (music) {
        case 'musica1':
            sessionStorage.setItem('musica', '../assets/game assets/music/Musica_de_fondo.mp3')
            break;
        case 'musica2':
            sessionStorage.setItem('musica', '../assets/game assets/music/Musica_de_fondo_2.mp3')
            break;
        case 'musica3':
            sessionStorage.setItem('musica', '../assets/game assets/music/Musica_de_fondo_3.mp3')
            break;
    }
}

</script>