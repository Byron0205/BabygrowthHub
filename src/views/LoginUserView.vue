<template>
    <div class="container-login">
        <div class="container-img-login">
            <img
                src="https://sw-baby-growth-hub.s3.us-east-2.amazonaws.com/imagenes-sitio-web/decoracion-espacio.svg"
                alt=""
            />
            <img
                class="img-padres-2"
                src="https://sw-baby-growth-hub.s3.us-east-2.amazonaws.com/imagenes-sitio-web/login-01.svg"
                alt=""
            />
        </div>
        <login-user />
        <div class="container-img-login">
            <img
                class="sun-sticker"
                src="https://sw-baby-growth-hub.s3.us-east-2.amazonaws.com/imagenes-sitio-web/decoracion-sol.svg"
                alt=""
            />
            <img
                class="img-padres-1"
                src="https://sw-baby-growth-hub.s3.us-east-2.amazonaws.com/imagenes-sitio-web/login-02.svg"
                alt=""
            />
        </div>
    </div>
</template>

<script>
import LoginUser from "../components/LoginUser.vue";
export default {
    components: { LoginUser },
};
</script>

<style></style>
