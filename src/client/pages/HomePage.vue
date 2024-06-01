<template>
    <div>
        <Navbar />
        <header class="p-5">
            <h1 class="text-white text-center font-custom">Nombre del juego</h1>
        </header>
        <section class="container mt-5 mb-5">
            <div class="col-10 justify-content-center align-items-center m-auto">
                <div class="col-md-12">
                    <h2 class="text-white font-custom">Como se juega:</h2>
                    <!-- Descripcion del flujo de juego-->
                    <div class="col-md-12 fs-4 p-3 ml mb-3">
                        <p class="text-white font-custom align-justify">
                            Primero, para tener acceso al videojuego, debes iniciar sesion con una cuenta registrada.
                            Luego, haz clic en el boton 'Game' y selecciona un personaje y una musica de fondo.
                        </p>
                    </div>

                    <!--Movimientos laterales-->
                    <div class="mb-3">
                        <div class="text-white mb-3">
                            <div class="row">
                                <div class="col-md-5 text-center">
                                    <img src="../assets/wiki/Tecla flecha izquierda.png" class="img-fluid icon">
                                    <span class="p-2">O</span>
                                    <img src="../assets/wiki/Tecla flecha A.png" class="img-fluid icon">

                                </div>
                                <div class="col-md-6">
                                    <p class="font-custom align-justify">
                                        Para mover al personaje hacia la izquierda, el Jugador 1 debe presionar la
                                        tecla direccional izquierda, mientras que el Jugador 2 debe presionar la tecla
                                        'A'.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="text-white mb-3">
                            <div class="row">
                                <div class="col-md-5 text-center">
                                    <img src="../assets/wiki/Tecla flecha derecha.png" class="img-fluid icon">
                                    <span class="p-2">O</span>
                                    <img src="../assets/wiki/Tecla flecha D.png" class="img-fluid icon">
                                </div>
                                <div class="col-md-6">
                                    <p class="font-custom align-justify">
                                        Para mover al personaje hacia la derecha, el Jugador 1 debe presionar la
                                        tecla direccional derecha, mientras que el Jugador 2 debe presionar la tecla
                                        'D'.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--Salto-->
                    <div class="mb-3">
                        <div class="text-white mb-3">
                            <div class="row">
                                <div class="col-md-5 text-center">
                                    <img src="../assets/wiki/Tecla flecha arriba.png" class="img-fluid icon">
                                    <span class="p-2">O</span>
                                    <img src="../assets/wiki/Tecla flecha W.png" class="img-fluid icon">
                                </div>
                                <div class="col-md-6">
                                    <p class="font-custom align-justify">
                                        Para hacer que el personaje salte, el Jugador 1 debe presionar la flecha hacia
                                        arriba y el Jugador 2 debe presionar la tecla 'W'.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.font-custom {
    font-family: "Planes_ValMore", sans-serif;
}

.ml {
    margin-left: 24px;
}

.icon {
    width: 25%;
    height: 85%;
}

.align-justify{
    text-align: justify;
}
</style>

<script setup>
import Navbar from '../components/Navbar.vue';
</script>