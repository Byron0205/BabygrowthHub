<template>
    <div class="container">
        <div class="container-img-login">
            <img
                src="https://sw-baby-growth-hub.s3.us-east-2.amazonaws.com/imagenes-sitio-web/decoracion-espacio.svg"
                alt=""
            />
            <img
                class="img-padres-2"
                src="https://sw-baby-growth-hub.s3.us-east-2.amazonaws.com/imagenes-sitio-web/token-01.svg"
                alt=""
            />
        </div>
        <tokenComp />
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
import tokenComp from "../components/ValidToken.vue";
export default {
    components: { tokenComp },
    methods: {
        checkUserSession() {
            const sessionValue = localStorage.getItem("session");
            if (sessionValue === "0" || sessionValue === undefined) {
                this.$router.push("/login");
            }
        },
    },
    mounted() {
        this.checkUserSession();
    },
};
</script>

<style></style>
