<template>
    <div class="task" v-for="task in tasks" :key="task">
        <div class="info-task">
            <div class="info-left-task">
                <p class="task-name">{{ task.name }}</p>
                <p class="task-tag">
                    <img src="../assets/img/icono-label.svg" alt="label">
                    {{ task.tag }}
                </p>
            </div>
            <div class="info-right-task">
                <p class="task-priority">Prioridad {{ task.priority }}</p>
                <div class="task-date">
                    <img src="../assets/img/icono-reloj.svg" alt="label">
                    <p>{{ task.date }}</p>
                </div>
            </div>
        </div>
        <div class="description-task">
            <div>
                <img src="../assets/img/icono-texto.svg" alt="label">
            </div>
            <div class="description-task-text">{{ task.description }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tasks: {
                task1: {
                    name: 'Cita Pediatria',
                    tag: 'Cita medica',
                    priority: 'Alta',
                    date: '2:00 pm 6/4/2023',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est cupiditate non earum rem, cum perferendis ut! Atque enim aspernatur maxime, esse ut mollitia officiis, repellendus perferendis reiciendis deserunt nisi ipsa?'
                },
                task2: {
                    name: 'Retiro medicamento',
                    tag: 'Cita medica',
                    priority: 'Media',
                    date: '2:00 pm 7/4/2023',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est cupiditate non earum rem, cum perferendis ut! Atque enim aspernatur maxime, esse ut mollitia officiis, repellendus perferendis reiciendis deserunt nisi ipsa?'
                },

            }
        }
    }
}
</script>

<style></style>