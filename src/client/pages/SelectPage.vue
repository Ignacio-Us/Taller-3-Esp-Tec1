<template>
    <Navbar />
    <div class="col-10 justify-content-center align-items-center m-auto">

        <div class="row">
            <!-- Personaje Jugador 1-->
            <div class="col-md-3 mt-5">
                <h5 class="text-white text-center font-custom">
                    Seleccione un personaje
                    <br>
                    Jugador 1
                </h5>
                <div class="row mt-5">
                    <div class="col-md-2 p-5">
                        <button @click="prev1()" class="btn text-white border-2 border-white"> < </button>
                    </div>

                    <div class="col-md-4">
                        <div class="carousel">
                            <Transition>
                                <img :src="state1" :key="state1" />
                            </Transition>
                        </div>
                    </div>

                    <div class="col-md-2 pt-5">
                        <button @click="next1()" class="btn text-white border-2 border-white"> > </button>
                    </div>
                </div>
            </div>
            <!-- Personaje Jugador 2-->
            <div class="col-md-3 offset-md-6 mt-5">
                <h5 class="text-white text-center font-custom">
                    Seleccione un personaje
                    <br>
                    Jugador 2
                </h5>
                <div class="row mt-5">
                    <div class="col-md-2 p-5">
                        <button @click="prev2()" class="btn text-white border-2 border-white">
                            < </button>
                    </div>

                    <div class="col-md-4">
                        <div class="carousel">
                            <Transition>
                                <img :src="state2" :key="state2" />
                            </Transition>
                        </div>
                    </div>

                    <div class="col-md-2 pt-5">
                        <button @click="next2()" class="btn text-white border-2 border-white"> > </button>
                    </div>
                </div>
            </div>
        </div>

        <!--Selecctor de musica-->
        <div class="col-md-12">
            <div class="row justify-content-center">
                <div class="col-sm-1">
                    <button
                        :class="{ 'btn btn-success': selectedMusic === 'musica1', 'btn btn-outline-success': selectedMusic !== 'musica1' }"
                        @click="selectMusic('musica1')">Música 1</button>
                </div>

                <div class="col-sm-1">
                    <button
                        :class="{ 'btn btn-success': selectedMusic === 'musica2', 'btn btn-outline-success': selectedMusic !== 'musica2' }"
                        @click="selectMusic('musica2')">Música 2</button>
                </div>

                <div class="col-sm-1">
                    <button
                        :class="{ 'btn btn-success': selectedMusic === 'musica3', 'btn btn-outline-success': selectedMusic !== 'musica3' }"
                        @click="selectMusic('musica3')">Música 3</button>
                </div>
            </div>
        </div>

        <div class="row justify-content-center mt-5">
            <div class="col-sm-1">
                <button @click="saveData()" class="btn btn-light fs-3">Play</button>
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
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const { state: state1, next: next1, prev: prev1 } = useCycleList([
    character1,
    character2,
    character3
]);

const { state: state2, next: next2, prev: prev2 } = useCycleList([
    character1,
    character2,
    character3
]);

const selectedMusic = ref('musica1');

const selectMusic = (music) => {
    selectedMusic.value = music
}

const saveData = async () => {
    const pathPlayer1 = state1.value.split('/').pop();
    const pathPlayer2 = state2.value.split('/').pop();

    sessionStorage.setItem('player1', pathPlayer1.replace('.png', ''));
    sessionStorage.setItem('player2', pathPlayer2.replace('.png', ''));

    let musicPath;

    switch (selectedMusic.value) {
        case 'musica1':
            musicPath = await import('../assets/game assets/music/Musica_de_fondo.mp3');
            break;
        case 'musica2':
            musicPath = await import('../assets/game assets/music/Musica_de_fondo_2.mp3');
            break;
        case 'musica3':
            musicPath = await import('../assets/game assets/music/Musica_de_fondo_3.mp3');
            break;
    }
    sessionStorage.setItem('musica', musicPath.default);
    router.push({ path: '/game' });
}

</script>