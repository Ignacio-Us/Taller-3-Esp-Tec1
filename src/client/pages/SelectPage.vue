<template>
    <Navbar />
    <div class="col-10 justify-content-center align-items-center m-auto">

        <!-- Personaje Jugador 1-->
        <div class="col-md-3">
            <h5 class="text-white">Seleccione un personaje</h5>
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

const { state, next, prev } = useCycleList([
    character1,
    character2,
    character3
]); 
</script>