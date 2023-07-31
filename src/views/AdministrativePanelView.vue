<template>
    <div class="title-container">
        <div class="dashed-border">
            <h1 class="title">Administración de Grupo Familiar</h1>
        </div>
    </div>
    <div class="page-wrapper">
        <div class="container-adm-family">
            <div class="left-container">
                <p class="text-info-adm">¡Disfruta de la oportunidad de liderar y cuidar de tu preciado grupo familiar en
                    este espacio dedicado a su bienestar y felicidad!</p>
                <div class="family-adm-group">
                    <div class="family-info">
                        <h2 class="title-adm-family">Encargada/o del grupo familiar:</h2>
                        <p class="family-adm">{{ encargadoPrincipal }}</p>
                    </div>
                    <div class="family-role">
                        <i class="fa-regular fa-user" style="color: #4F439A; font-weight: 600;"></i>
                        <p class="rol-adm-family">{{ encargadoPrincipalRole }}</p>
                    </div>
                </div>
                <div v-if="selectedMemberIndex !== null" class="container-select-guess">
                    <div class="select-guess-dash">
                        <p class="text-select-guess-dash">Selecciona el invitado a modificar su rol</p>
                    </div>
                    <div class="select-guess-border">
                        <p class="selected-user-rol">{{ selectedMemberIndex !== null ?
                            familyMembers[selectedMemberIndex].name : '' }}</p>
                        <select class="rols-user" @change="updateRole" v-if="selectedMemberIndex !== null"
                            v-model="selectedMemberRole">
                            <option value="2">Padre</option>
                            <option value="1">Madre</option>
                            <option value="3">Encargado</option>
                            <option value="5">Invitado</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="right-container">
                <div class="family-members">
                    <div v-for="(member, index) in familyMembers" :key="index"
                        :class="{ 'selected-member': member.selected, 'select-member': !member.selected }"
                        @click="selectMember(index)">
                        <div class="family-info-members">
                            <p class="member-text">{{ member.name }}</p>
                        </div>
                        <div :class="['family-rol', `role-${member.role.toLowerCase()}`]">
                            <i class="fa-regular fa-user" :style="{ color: getRoleColor(member.role) }"></i>
                            <p class="rol-adm-family" :style="{ color: getRoleColor(member.role) }">{{ member.role }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";
export default {
    name: 'BabygrowthHubAdministrativePanelView',

    data() {
        return {
            familyMembers: [],
            selectedMemberIndex: null,
            encargadoPrincipal: '',
            encargadoPrincipalRole: '',
            selectedMemberRole: '',
            roleMappings: {
                1: 'Madre',
                2: 'Padre',
                3: 'Encargado',
                5: 'Invitado',
            },
        };
    },

    watch: {
        selectedMemberIndex(newValue) {
            this.selectedMemberRole = newValue !== null ? this.familyMembers[newValue].role : '';
        },
        selectedMemberRole(newValue) {
            if (this.selectedMemberIndex !== null) {
                this.familyMembers[this.selectedMemberIndex].role = newValue;
            }
        },
    },

    methods: {
        fetchFamilyMembers(idBebe) {
            axios.get(`https://tiusr3pl.cuc-carrera-ti.ac.cr/adultosxbebe/${idBebe}`)
                .then(response => {
                    this.familyMembers = response.data.map(member => ({
                        IDAdulto: member.IDAdulto,
                        name: member.NombreCompleto,
                        role: member.Rol,
                        isEncargadoPrincipal: member.EncargadoPrincipal === 1,
                        selected: false,
                    }));

                    const encargadoPrincipalMember = this.familyMembers.find(member => member.isEncargadoPrincipal);
                    if (encargadoPrincipalMember) {
                        this.encargadoPrincipal = encargadoPrincipalMember.name;
                        this.encargadoPrincipalRole = encargadoPrincipalMember.role;
                    } else {
                        this.encargadoPrincipal = `Este grupo familiar no tiene encargado`;
                        this.encargadoPrincipalRole = '';
                    }
                })
                .catch(error => {
                    console.error('Error fetching family members:', error);
                });
        },

        selectMember(index) {
            if (this.selectedMemberIndex !== null) {
                this.familyMembers[this.selectedMemberIndex].selected = false;
            }
            this.selectedMemberIndex = index;
            this.familyMembers[index].selected = true;
            this.selectedMemberRole = this.familyMembers[index].role;
        },

        getRoleColor(role) {
            switch (role.toLowerCase()) {
                case 'padre' || '2':
                    return '#4F439A';
                case 'madre' || '1':
                    return '#E871B5';
                case 'encargado' || '3':
                    return '#56A8B9';
                case 'invitado' || '5':
                    return '#FEBD54';
                default:
                    return '#000000';
            }
        },
        async updateRole() {
            if (this.selectedMemberIndex !== null) {
                const IDBebe = this.$route.params.id;
                const newRole = this.selectedMemberRole;

                const existingRoles = this.familyMembers.map(member => member.role);
                const roleCount1 = existingRoles.filter(role => role === 'Madre').length;
                const roleCount2 = existingRoles.filter(role => role === 'Padre').length;

                if ((newRole === '1' && roleCount1 >= 1) || (newRole === '2' && roleCount2 >= 1)) {
                    console.error("Error: There can only be one member with role 'Madre' (1) and one member with role 'Padre' (2).");
                    this.fetchFamilyMembers(IDBebe);
                    return;
                }

                this.familyMembers[this.selectedMemberIndex].role = newRole;
                
                const { name, role } = this.familyMembers[this.selectedMemberIndex];
                const IDAdulto = this.familyMembers[this.selectedMemberIndex].IDAdulto;

                try {
                    await axios.put(`https://tiusr3pl.cuc-carrera-ti.ac.cr/adultosxbebe/${IDBebe}`, {
                        IDAdulto: IDAdulto,
                        NuevoRol: role,
                    });

                    console.log("Rol modificado exitosamente en el backend.");
                    this.fetchFamilyMembers(IDBebe);
                } catch (error) {
                    console.error("Error al modificar el rol en el backend:", error);
                }
            }
        },
    },
    userRole() {
        const userRole = localStorage.getItem("userRol");
        if (userRole === "0" || userRole === undefined) {
            this.$router.push("/login");
        }
        return userRole;
    },

    mounted() {
        if (localStorage.getItem("session") !== "1") {
            this.$router.push("/login");
        }
        const IDBebe = this.$route.params.id;
        console.log(IDBebe)
        this.fetchFamilyMembers(IDBebe);
    },
};
</script>