<template>
    <div class="container-inicio">
        <div>
        <h1 class="stats-title" >Estadísticas importantes de los tesoros</h1>
        <div class="cards-container">
            <div class="card-dream">
                <i class="fa-regular fa-moon custom-icon" style="color: #796CD0;"></i>
                <h2><strong>14h</strong></h2>
                <p>Promedio de horas de dulce descanso</p>
            </div>
            <div class="card-height">
                <i class="fa-solid fa-ruler-vertical custom-icon" style="color: #FCB510;"></i>
                <h2>77 cm</h2>
                <p>Altura actual de tu pequeño</p>
            </div>
            <div class="card-weight">
                <img src="../../assets/img/Decoracion-sol.png" alt="img-sol">
                <i class="fa-solid fa-weight-scale custom-icon" style="color: #69dcff;"></i>
                <h2>10.5 Kg</h2>
                <p>Peso actual de tu pequeño</p>
            </div>
        </div>
        <div class="text-card"> 
            <p>Cuidar del <strong>sueño, peso y altura</strong> de nuestros bebés es un tesoro invaluable. 
                Con amor y atención, trazamos su camino hacia un crecimiento saludable y
                lleno de felicidad. ¡Registremos juntos cada paso de este maravilloso viaje hacia un futuro radiante!</p>
        </div>
        </div>

        <div class="photos-content">
            <!-- <img src="../../assets/img/decoracion-rosa.png" alt="" class="image-top"> -->
            <img src="../../assets/img/Imagen-niños.png" alt="" class="image-bottom">
        </div>
    </div>
</template>

<script>
export default {
    name: 'BabygrowthHubInicioView',

    data() {
        return {
            
        };
    },

    mounted() {
        if(localStorage.getItem('session') !== '1'){
            this.$router.push('/login')
        }
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>