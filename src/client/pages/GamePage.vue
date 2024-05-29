<template>
    <Navbar />

    <div id="game-container"></div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

import Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload() {
            // Carga de recursos del juego
        },
        create() {
            // Lógica de inicialización del juego
        },
        update() {
            // Lógica de actualización del juego
        },
    },
};

new Phaser.Game(config);
</script>