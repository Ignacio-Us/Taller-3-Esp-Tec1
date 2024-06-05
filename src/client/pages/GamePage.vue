<template>
  <Navbar />
  <div class="border border-white border-3" id="game-container" ref="gameContainer"></div>
</template>

<style>
#game-container {
  width: 805px;
  height: 605px;
  margin: 50px auto;
}
</style>

<script setup>
import { onMounted, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import Phaser from 'phaser';
import backgroundImage from '../assets/game assets/background_glacial_mountains.png';
import plataformImage from '../assets/game assets/platform.png';
import coinImage from '../assets/game assets/brackeys_platformer_assets/sprites/coin.png';
import coinSound from '../assets/game assets/brackeys_platformer_assets/sounds/coin.wav';
import character1Image from '../assets/game assets/free-pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster_Walk_6.png';
import character2Image from '../assets/game assets/free-pixel-art-tiny-hero-sprites/2 Owlet_Monster/Owlet_Monster_Walk_6.png';
import character3Image from '../assets/game assets/free-pixel-art-tiny-hero-sprites/3 Dude_Monster/Dude_Monster_Walk_6.png';

const backgroundMusicPath = sessionStorage.getItem('musica');
const player1 = sessionStorage.getItem('player1');
const player2 = sessionStorage.getItem('player2');


const playerSkin = {
  'Pink_Monster': character1Image,
  'Owlet_Monster': character2Image,
  'Dude_Monster': character3Image,
};

const gameContainer = ref(null);
const gameTime = ref(60);
let timerText;

const score1 = ref(0);
const score2 = ref(0);
const scoreTextP1 = ref('');
const scoreTextP2 = ref('');

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
      this.load.audio('coinSound', coinSound);
      if (backgroundMusicPath) {
        this.load.audio('backgroundMusic', backgroundMusicPath);
      }

      console.log(player1)

      const player1ImagePath = playerSkin[player1];
      if (player1ImagePath) {
        this.load.spritesheet('player1', player1ImagePath, { frameWidth: 32, frameHeight: 32 });
      }

      const player2ImagePath = playerSkin[player2];
      console.log(player2ImagePath)
      if (player2ImagePath) {
        this.load.spritesheet('player2', player2ImagePath, { frameWidth: 32, frameHeight: 32 });
      }
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

      // Jugador 1
      const player1 = this.physics.add.sprite(100, 450, 'player1').setScale(1.5).refreshBody();
      player1.setCollideWorldBounds(true);

      // Animacion Jugador 1
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player1', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'turn',
        frames: [{ key: 'player1', frame: 5 }],
        frameRate: 20
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player1', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
      });

      // Jugador 2
      const player2 = this.physics.add.sprite(700, 450, 'player2').setScale(1.5).refreshBody();
      player2.setCollideWorldBounds(true);

      // Animacion Jugador 2
      this.anims.create({
        key: 'left2',
        frames: this.anims.generateFrameNumbers('player2', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'turn2',
        frames: [{ key: 'player2', frame: 5 }],
        frameRate: 20
      });

      this.anims.create({
        key: 'right2',
        frames: this.anims.generateFrameNumbers('player2', { start: 0, end: 5 }),
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

      // Teclado
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wad = {
        W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
      }

      // Collider Jugador 1 -> Plataforma
      this.physics.add.collider(player1, platforms);

      this.player1 = player1;

      // Collider Jugador 2 -> Plataforma

      this.physics.add.collider(player2, platforms);

      this.player2 = player2;

      // Moneda
      const coins = this.physics.add.group();
      addRandomCoin(this, coins, platforms);

      this.physics.add.collider(coins, platforms);

      // Interaccion Jugador 1 on la moneda
      this.physics.add.overlap(player1, coins, (player1, coin) => {
        coin.disableBody(true, true);

        this.sound.play('coinSound');

        score1.value += 10;
        scoreTextP1.value.setText(`Score P1: ${score1.value}`);
        addRandomCoin(this, coins, platforms);
      });

      // Interaccion Jugador 2 on la moneda
      this.physics.add.overlap(player2, coins, (player2, coin) => {
        coin.disableBody(true, true);

        this.sound.play('coinSound');

        score2.value += 10;
        scoreTextP2.value.setText(`Score P2: ${score2.value}`);
        addRandomCoin(this, coins, platforms);
      });

      // Puntuacion
      scoreTextP1.value = this.add.text(16, 16, 'Score P1: 0', { fontSize: '16px', fill: '#FFF' });
      scoreTextP2.value = this.add.text(650, 16, 'Score P2: 0', { fontSize: '16px', fill: '#FFF' });

      // Musica de Fondo
      if (backgroundMusicPath) {
        this.backgroundMusic = this.sound.add('backgroundMusic');
        if (this.backgroundMusic) {
          this.backgroundMusic.play({ loop: true });
        } else {
          console.error('Background music not found or failed to load.');
        }
      }

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
      // Lógica de movimiento del jugador 1
      if (this.cursors.left.isDown) {
        this.player1.setVelocityX(-160);
        this.player1.anims.play('left', true);
        this.player1.flipX = true;
      }
      else if (this.cursors.right.isDown) {
        this.player1.setVelocityX(160);
        this.player1.anims.play('right', true);
        this.player1.flipX = false;
      }
      else {
        this.player1.setVelocityX(0);
        this.player1.anims.play('turn', true);
      }

      if (this.cursors.up.isDown && this.player1.body.touching.down) {
        this.player1.setVelocityY(-330);
      }

      // Lógica de movimiento del jugador 2
      if (this.wad.A.isDown) {
        this.player2.setVelocityX(-160);
        this.player2.anims.play('left2', true);
        this.player2.flipX = true;
      }
      else if (this.wad.D.isDown) {
        this.player2.setVelocityX(160);
        this.player2.anims.play('right2', true);
        this.player2.flipX = false;
      }
      else {
        this.player2.setVelocityX(0);
        this.player2.anims.play('turn2', true);
      }

      if (this.wad.W.isDown && this.player2.body.touching.down) {
        this.player2.setVelocityY(-330);
      }

      if (gameTime.value <= 0) {
        this.scene.pause();
        if (this.backgroundMusic) {
          this.backgroundMusic.pause();
        }
        timerText.setText('Game Over');
      }
    }
  }
};

function addRandomCoin(scene, coins, platforms) {
  // Número máximo de intentos para colocar la moneda
  const maxAttempts = 10; 
  
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