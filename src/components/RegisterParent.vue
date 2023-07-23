<template>
    <div class="container-register">
        <p class="title-register">¿Quién eres?</p>
        <form @submit.prevent="registerParentForm" class="login form-register">
            <div class="input-container width-50">
                <input v-model="parent.IDAdulto" class="input" type="text" placeholder="">
                <div class="cut"></div>
                <label class="placeholder">Cedula</label>
            </div>
            <div class="flex flex-register input-container width-50">

                <div class="input-container width-50 ic1">
                    <input v-model="parent.Nombre" class="input" type="text" placeholder="">
                    <div class="cut"></div>
                    <label class="placeholder">Nombre</label>
                </div>

                <!-- select -->
                <div class="input-container width-50 ic1">
                    <select v-model="parent.IDRol" name="relacion" class="input" id="">
                        <option value="1">madre</option>
                        <option value="1">padre</option>
                    </select>
                    <div class="cut"></div>
                    <label class="placeholder">Relación</label>
                </div>

            </div>
            <div class="input-container width-50 ic1">
                <input v-model="parent.Apellidos" class="input" type="text" placeholder="">
                <div class="cut"></div>
                <label class="placeholder">Apellidos</label>
            </div>
            <div class="input-container width-50">
                <input v-model="parent.Correo" class="input" type="text" placeholder="">
                <div class="cut"></div>
                <label class="placeholder">Correo</label>
            </div>
            <div class="input-container width-50">
                <input v-model="parent.Contrasenna" class="input" type="text" placeholder="">
                <div class="cut"></div>
                <label class="placeholder">Contraseña</label>
            </div>
            <div class="input-container width-50 text-center">
                <button class="submit submit-register">Confirmar</button>
            </div>
            
        </form>
        <svg class="img-cloud-bg" xmlns="http://www.w3.org/2000/svg" width="1374" height="722" viewBox="0 0 1374 722"
            fill="none">
            <path
                d="M4.13109 685.406C-6.90012 675.34 6.19231 665.268 19.5902 660.233C32.9882 655.199 44.7918 649.176 55.6617 673.287C60.2175 683.392 48.0485 695.037 28.3505 695.037C13.4066 695.037 15.6287 695.898 4.13109 685.406ZM89.1566 667.282C59.8676 656.157 59.5468 627.149 89.1566 616.433C111.475 608.354 118.971 613.264 129.866 628.013C150.602 656.081 128.79 682.336 89.1566 667.282ZM177.274 643.116C177.274 643.116 132.384 623.021 152.024 597.302C168.514 549.079 230.751 584.716 230.751 584.716C230.751 584.716 255.659 602.294 236.019 628.013C215.508 654.871 177.274 643.116 177.274 643.116ZM810.413 718.045C760.335 710.439 728.358 701.151 690.067 683.089L669.289 673.287L633.699 685.581C614.122 692.344 585.865 699.666 570.898 701.851C430.862 722.307 293.736 662.829 257.966 566.124C253.099 552.961 249.134 547.04 245.629 547.698C242.788 548.229 226.469 549.298 209.365 550.074C152.725 552.64 106.571 539.88 66.7204 510.633C42.9885 493.218 32.6792 480.863 23.1974 458.476C10.4406 428.358 18.272 386.013 41.5316 359.347C56.2562 342.465 89.3399 320.88 113.487 312.398L135.86 304.542L140.717 286.853C159.095 219.924 245.727 169.839 343.12 169.839H365.699L368.169 153.297C377.847 88.4788 447.795 29.1947 541.739 6.18809C563.204 0.930768 574.898 0 619.487 0C664.07 0 675.764 0.930675 697.234 6.18809C768.211 23.5692 824.709 60.0964 853.227 107.033C859.338 117.091 866.296 124.695 869.107 124.382C871.859 124.076 884.606 121.159 897.435 117.9C929.19 109.832 985.544 107.927 1020.79 113.729C1088.9 124.937 1149.56 158.332 1178.18 200.383C1187.15 213.55 1177.92 203.809 1196.76 214.677C1215.61 225.545 1218.47 231.241 1240.34 234.104C1277.85 239.01 1295.75 247.467 1325.88 267.835C1348.03 282.806 1370.14 342.878 1373.81 389.669C1376.79 427.73 1344.43 494.89 1344.43 494.89C1344.43 494.89 1310.94 536.173 1248.07 552.787C1248.07 552.787 1240.34 595.131 1204.79 614.208C1176.62 629.32 1107.91 625.284 1107.91 625.284C1042.98 701.268 1035.08 722.727 872.167 721.981C851.856 721.889 824.061 720.115 810.408 718.041L810.413 718.045Z"
                fill="url(#paint0_linear_163_139)" />
            <defs>
                <linearGradient id="paint0_linear_163_139" x1="1302" y1="245.498" x2="297.949" y2="655.819"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#7ECAFD" stop-opacity="0.2" />
                    <stop offset="1" stop-color="#7ECAFD" stop-opacity="0.05" />
                </linearGradient>
            </defs>
        </svg>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            parent:{
                IDAdulto: '',
                Nombre: '',
                Apellidos: '',
                Correo: '',
                Contrasenna: '',
                IDRol: '1'
            }
        }
    },
    methods:{
        registerParentForm(){
            const url = 'http://localhost:3000/registrarAdulto';

            axios.post(url,this.parent)
            .then(response=>{
                const msg = response.data
                console.log(msg)
            })
            .catch(error=>{
                console.error('Error al guardar el usuario: '+ error)
            })

            console.log(this.parent)
            //this.$router.push('/registro/3')
        }
    }
}
</script>

<style></style>