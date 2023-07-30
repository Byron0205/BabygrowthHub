<template>
    <p class="user-name">¡Bienvenido de nuevo, <span class="name">{{ nombreUsuario.split(' ')[0] }}</span>!</p>
    <div class="container-inicio">
        <div>
            <h1 class="stats-title">Estadísticas según la edad de los tesoros <br> {{ promedios[edadActual].edad }} años
            </h1>
            <div class="cards-container">
                <div class="card-dream">
                    <i class="fa-regular fa-moon custom-icon" style="color: #796CD0;"></i>
                    <h2><strong>{{ promedios[edadActual].horasSueno }}</strong></h2>
                    <p>Promedio de horas de dulce descanso</p>
                </div>
                <div class="card-height">
                    <i class="fa-solid fa-ruler-vertical custom-icon" style="color: #FCB510;"></i>
                    <h2>{{ promedios[edadActual].altura }} cm</h2>
                    <p>Promedio de altura de los tesoros</p>
                </div>
                <div class="card-weight">
                    <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Decoracion-sol.png"
                        alt="img-sol">
                    <i class="fa-solid fa-weight-scale custom-icon" style="color: #69dcff;"></i>
                    <h2>{{ promedios[edadActual].peso }} Kg</h2>
                    <p>Promedio de peso en los tesoros</p>
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
            <img src="https://baby-growth-hub.s3.amazonaws.com/ImagenesSitioWeb/img/Imagen-ni%C3%B1os.png" alt=""
                class="image-bottom">
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    //name: 'BabygrowthHubInicioView',
    data() {
        return {
            nombreUsuario: '',
            edadActual: 0,
            promedios: [
                { edad: 0, horasSueno: 14, altura: 50, peso: 3.4 },
                { edad: 1, horasSueno: 12, altura: 75, peso: 9 },
                { edad: 2, horasSueno: 10, altura: 87, peso: 12 },
                { edad: 3, horasSueno: 11, altura: 96, peso: 14 },
                { edad: 4, horasSueno: 10, altura: 102, peso: 16 },
                { edad: 5, horasSueno: 9, altura: 107, peso: 18 }
            ],
            IDAdulto: '',
            events: [],
            notificationShow: false
        };
    },

    mounted() {
        this.checkUserSession();
        this.nombreUsuario = localStorage.getItem('nombre');
        this.IDAdulto = localStorage.getItem('idAdulto');
        this.notificationShow = localStorage.getItem('notification') == "false" ? false: true
        this.updateData();
        setInterval(this.updateData, 5000);
        this.getActivities()
    },

    methods: {
        checkUserSession() {
            const sessionValue = localStorage.getItem('session');
            if (sessionValue === '0' || sessionValue === undefined) {
                this.$router.push('/login');
            }
        },
        updateData() {
            this.edadActual += 1;
            if (this.edadActual >= this.promedios.length) {
                this.edadActual = 0;
            }
        },
        VerNotificaciones() {

            const notifi = this.events;
            // Verificar si el navegador admite notificaciones
            if ("Notification" in window) {
                // Solicitar permiso al usuario para mostrar notificaciones
                Notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                        //console.log("Permiso concedido para mostrar notificaciones.");
                        // Ahora puedes enviar notificaciones
                        notifi.forEach(function (elemento) {
                            var notificacion = new Notification(elemento.Titulo, {
                                body: elemento.Detalle,
                                //icon: "URL_del_icono.png" // Puedes agregar una URL de imagen para el icono de la notificación
                            });
                            notificacion.onclick = function () {
                                // Acción que se realizará al hacer clic en la notificación (opcional)

                                // Enviar un mensaje a la aplicación Vue cuando el usuario hace clic en la notificación
                                window.postMessage({ type: "verActividad", data: "actividades/calendario" }, window.origin);
                            };

                            notificacion.onclose = function () {
                                // Acción que se realizará cuando el usuario cierre la notificación (opcional)
                                //console.log("El usuario cerró la notificación.");
                            };
                        });
                    } else if (permission === "denied") {
                        console.log("El usuario ha denegado el permiso para mostrar notificaciones.");
                    } else {
                        console.log("El usuario no ha decidido aún sobre el permiso para mostrar notificaciones.");
                    }
                });
            } else {
                console.log("Este navegador no admite notificaciones.");
            }
        },
        getActivities() {
            const today = new Date()
            today.setHours(0, 0, 0, 0);

            axios
                .get(`https://tiusr3pl.cuc-carrera-ti.ac.cr/recuperar-actividades/${this.IDAdulto}`)
                .then((response) => {
                    this.events = response.data;

                    this.events.forEach(element => {
                        element.Fecha = new Date(element.Fecha);
                        //console.log(today);
                        //console.log(element.Fecha);
                    });
                    //ver eventos de hoy y posteriores
                    //this.events = this.events.filter(element => element.Fecha >= today);
                    this.events = this.events.filter(element => {
                        const eventDate = new Date(element.Fecha);
                        eventDate.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para el evento
                        return eventDate.getTime() === today.getTime();
                        
                    })
                    if(!this.notificationShow){
                        this.VerNotificaciones();
                        this.notificationShow = true;
                        localStorage.setItem('notification', true)
                    }
                    
                })
                .catch((error) => {
                    console.error("Error al obtener los datos:", error);
                });
        },

    }
};
</script>
