<template>
  <Navbar />
  <br>
  <div class="border border-white border-3" id="game-container" ref="gameContainer"></div>
</template>

<style>
#game-container {
  width: 805px;
  height: 605px;
  margin: 0 auto;
}
</style>

<script setup>
import { onMounted, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import Phaser from 'phaser';
import backgroundImage from '../assets/game assets/background_glacial_mountains.png';
import plataformImage from '../assets/game assets/platform.png';
import coinImage from '../assets/game assets/brackeys_platformer_assets/sprites/coin.png';
import playerImage from '../assets/game assets/free-pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster_Walk_6.png';
import coinSound from '../assets/game assets/brackeys_platformer_assets/sounds/coin.wav';
import backgroundSound from '../assets/game assets/Musica_de_fondo.mp3';

const gameContainer = ref(null);
const gameTime = ref(60);
let timerText;

const score = ref(0);
const scoreText = ref('');

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload() {
      console.log('Preloading assets...');
      this.load.image('background', backgroundImage);
      this.load.image('platforms', plataformImage);
      this.load.spritesheet('coin', coinImage, { frameWidth: 16, frameHeight: 16 });
      this.load.spritesheet('player', playerImage, { frameWidth: 32, frameHeight: 32 });
      this.load.audio('coinSound', coinSound);
      this.load.audio('backgroundSound', backgroundSound);
    },
    create() {
      console.log('Creating scene...');

      // Fondo
      const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
      bg.setDisplaySize(this.scale.width, this.scale.height);

      // Plataforma
      const platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, 'platforms').setScale(2).refreshBody();
      platforms.create(700, 400, 'platforms');
      platforms.create(75, 400, 'platforms');
      platforms.create(400, 250, 'platforms');
      platforms.create(700, 125, 'platforms');
      platforms.create(75, 125, 'platforms');

      // Jugador
      const player = this.physics.add.sprite(100, 450, 'player').setScale(1.5).refreshBody();
      player.setCollideWorldBounds(true);

      // Animacion Jugador
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'turn',
        frames: [{ key: 'player', frame: 5 }],
        frameRate: 20
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
      });

      // Animacion Moneda
      this.anims.create({
        key: 'spin',
        frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: -1
      });

      this.cursors = this.input.keyboard.createCursorKeys();

      this.physics.add.collider(player, platforms);

      this.player = player;

      // Moneda
      const coins = this.physics.add.group();
      addRandomCoin(this, coins, platforms);

      this.physics.add.collider(coins, platforms);
      this.physics.add.overlap(player, coins, (player, coin) => {
        coin.disableBody(true, true);

        this.sound.play('coinSound');

        score.value += 10;
        scoreText.value.setText(`Score P1: ${score.value}`);
        addRandomCoin(this, coins, platforms);
      });

      scoreText.value = this.add.text(16, 16, 'Score P1: 0', { fontSize: '16px', fill: '#FFF' });

      // Musica de Fondo
      this.music = this.sound.add('backgroundSound', { loop: true });
      this.music.play();

      // Temporizador
      timerText = this.add.text(325, 16, ` ${gameTime.value}`, { fontSize: '24px', fill: '#FFF' });
      this.time.addEvent({
        delay: 1000,
        callback: onEvent,
        callbackScope: this,
        loop: true
      });
    },
    update() {
      // Lógica de movimiento del jugador
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
        this.player.flipX = true;
      }
      else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
        this.player.flipX = false;
      }
      else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn', true);
      }

      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
      }

      if (gameTime.value <= 0) {
        this.scene.pause();
        this.music.pause();
        timerText.setText('Game Over');
      }
    }
  }
};

function addRandomCoin(scene, coins, platforms) {
  const maxAttempts = 10; // Número máximo de intentos para colocar la moneda
  let placed = false;

  for (let i = 0; i < maxAttempts; i++) {
    const x = Phaser.Math.Between(50, 750);
    const y = Phaser.Math.Between(50, 550);

    const coin = coins.create(x, y, 'coin').setScale(1.5).refreshBody();
    coin.anims.play('spin');

    const overlap = scene.physics.overlap(coin, platforms);

    if (!overlap) {
      // Si no hay colisión, colocar la moneda y salir del bucle
      placed = true;
      break;
    } else {
      // Si hay colisión, eliminar la moneda y reintentar
      coin.destroy();
    }
  }

  if (!placed) {
    console.warn('No se pudo colocar la moneda sin colisión después de múltiples intentos.');
  }
}

function onEvent() {
  if (gameTime.value > 0) {
    gameTime.value -= 1;
    timerText.setText(`Time: ${gameTime.value}`)
  }
}

onMounted(() => {
  console.log('Initializing Phaser game...');
  new Phaser.Game({
    ...config,
    parent: gameContainer.value,
  });
});
</script>