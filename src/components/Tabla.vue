<template>
    <div class="table">
        <div class="header-table">
            <p class="title-table">{{ titulo }}</p>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        titulo: String
    }
}
</script>

<style>

</style>