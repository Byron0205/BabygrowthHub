<template>
    <div class="container-inicio">
        <div>
            <h1 class="stats-title">Estadísticas según la edad de los tesoros <br> {{ promedios[edadActual].edad }} años</h1>
            <div class="cards-container">
                <div class="card-dream">
                    <i class="fa-regular fa-moon custom-icon" style="color: #796CD0;"></i>
                    <h2><strong>{{ promedios[edadActual].horasSueno }}</strong></h2>
                    <p>Promedio de horas de dulce descanso</p>
                </div>
                <div class="card-height">
                    <i class="fa-solid fa-ruler-vertical custom-icon" style="color: #FCB510;"></i>
                    <h2>{{ promedios[edadActual].altura }} cm</h2>
                    <p>Altura actual de tu pequeño</p>
                </div>
                <div class="card-weight">
                    <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Decoracion-sol.png" alt="img-sol">
                    <i class="fa-solid fa-weight-scale custom-icon" style="color: #69dcff;"></i>
                    <h2>{{ promedios[edadActual].peso }} Kg</h2>
                    <p>Peso actual de tu pequeño</p>
                </div>
            </div>
            <div class="text-card">
                <p>Cuidar del <strong>sueño, peso y altura</strong> de nuestros bebés es un tesoro invaluable.
                    Con amor y atención, trazamos su camino hacia un crecimiento saludable y
                    lleno de felicidad. ¡Registremos juntos cada paso de este maravilloso viaje hacia un futuro radiante!
                </p>
            </div>
        </div>

        <div class="photos-content">
            <!-- <img src="../../assets/img/decoracion-rosa.png" alt="" class="image-top"> -->
            <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Imagen-ni%C3%B1os.png" alt="" class="image-bottom">
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'BabygrowthHubInicioView',

    data() {
        return {
            edadActual: 0,
            promedios: [
                { edad: 0, horasSueno: 14, altura: 50, peso: 3.4 },
                { edad: 1, horasSueno: 12, altura: 75, peso: 9 },
                { edad: 2, horasSueno: 10, altura: 87, peso: 12 },
                { edad: 3, horasSueno: 11, altura: 96, peso: 14 },
                { edad: 4, horasSueno: 10, altura: 102, peso: 16 },
                { edad: 5, horasSueno: 9, altura: 107, peso: 18 }
            ]
        };
    },

    mounted() {
        if(localStorage.getItem('session') !== '1'){
            this.$router.push('/login')
        }
        this.updateData();
        setInterval(this.updateData, 5000);
    },

    methods: {
        updateData() {
            this.edadActual += 1;
            if (this.edadActual >= this.promedios.length) {
                this.edadActual = 0;
            }
        }
    }
};
</script>
  