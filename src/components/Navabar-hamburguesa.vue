<template>
    <div>
        <Slide width="360" :isOpen="isOpen" @closeMenu="isOpen = false">
            <ul class="navbar">
                <li class="item" v-if="!admin">
                    <router-link v-if="session" class="link" to="/inicio">Inicio</router-link>
                    <router-link v-else class="link" to="/babygrowthhub">Inicio</router-link>
                </li>
                <li class="item" v-if="admin && session == true">
                    <router-link v-if="session" class="link" to="/admin">Inicio</router-link>
                </li>


                <li class="item" v-if="!admin">
                    <router-link class="link" to="/etapas-desarrollo">Etapas</router-link>
                </li>
                <li class="item" v-if="!admin">
                    <router-link class="link" to="/dietas">Dietas</router-link>
                </li>
            </ul>

        </Slide>
    </div>
</template>


<script>
import { Slide } from 'vue3-burger-menu'  // import the CSS transitions you wish to use, in this case we are using `Slide`

export default {
    data() {
        return {
            isOpen: false
        }
    },
    components: {
        Slide // Register your component
    }
}
</script>

<style>


.bm-burger-bars {
    background-color: #4e4e4e;
}

.line-style {
    position: absolute;
    height: 20%;
    left: 0;
    right: 0;
}

.cross-style {
    position: absolute;
    top: 12px;
    right: 2px;
    cursor: pointer;
}

.bm-cross {
    background: #bdc3c7;
}

.bm-cross-button {
    height: 24px;
    width: 24px;
}

.bm-menu {
    height: 100%;
    /* 100% Full-height */
    width: 0;
    /* 0 width - change this with JavaScript */
    position: fixed;
    /* Stay in place */
    z-index: 1000;
    /* Stay on top */
    top: 0;
    left: 0;
    background-color: rgb(228, 228, 228) !important;
    /* Black*/
    overflow-x: hidden;
    /* Disable horizontal scroll */
    padding-top: 60px;
    /* Place content 60px from the top */
    transition: 0.5s;
    /*0.5 second transition effect to slide in the sidenav*/
}

.bm-overlay {
    background: rgb(201, 199, 199);
}

.bm-item-list {
    color: #b8b7ad;
    margin-left: 10%;
    font-size: 20px;
}

.bm-item-list>* {
    display: flex;
    text-decoration: none;
    padding: 0.7em;
}

.bm-item-list>*>span {
    margin-left: 10px;
    font-weight: 700;
    color: white;
}

.navbar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 0;
    padding: 20px;

    font-size: 25px;
    font-weight: 600;
    line-height: normal;
    font-family: 'Baloo 2', cursive;
    color: #e24a75;
}

@media (min-width: 720px) {
    .navbar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 0;
    padding: 20px;
}
}

.item {
    list-style-type: none;
}

.link{
    text-decoration: none;
    color: #e24a75;
    padding: 20px 10px 20px 10px;
}
.link:hover{
        border-radius: 15px 15px 15px 15px;
        color: #cf456c;
        background-color: #d1c8ca;
    }


.item > .router-link-exact-active{
    border-radius: 15px 15px 15px 15px;
    background-color: #d1c8ca;
}

</style>