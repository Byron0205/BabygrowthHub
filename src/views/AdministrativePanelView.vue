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
                        <p class="family-adm">Mauren García Mora</p>
                    </div>
                    <div class="family-role">
                        <i class="fa-regular fa-user" style="color: #4F439A; font-weight: 600;"></i>
                        <p class="rol-adm-family">Madre</p>
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
                            <option value="Padre">Padre</option>
                            <option value="Madre">Madre</option>
                            <option value="Encargado">Encargado</option>
                            <option value="Invitado">Invitado</option>
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
export default {
    name: 'BabygrowthHubAdministrativePanelView',

    data() {
        return {
            familyMembers: [
                {
                    name: 'Carlos Gómez Rodríguez',
                    role: 'Padre',
                    selected: false,
                },
                {
                    name: 'María López Herrera',
                    role: 'Madre',
                    selected: false,
                },
                {
                    name: 'Pedro Martínez Fernández',
                    role: 'Invitado',
                    selected: false,
                },
                {
                    name: 'Laura Ramírez Cruz',
                    role: 'Encargado',
                    selected: false,
                },
                {
                    name: 'Carlos Gómez Rodríguez',
                    role: 'Padre',
                    selected: false,
                },
                {
                    name: 'María López Herrera',
                    role: 'Madre',
                    selected: false,
                },
                {
                    name: 'Pedro Martínez Fernández',
                    role: 'Invitado',
                    selected: false,
                },
                {
                    name: 'Laura Ramírez Cruz',
                    role: 'Encargado',
                    selected: false,
                },

            ],
            selectedMemberIndex: null,
            selectedMemberRole: '',
        };
    },

    watch: {
        selectedMemberIndex(newValue) {
            this.selectedMemberRole = newValue !== null ? this.familyMembers[newValue].role : '';
        },
        selectedMemberRoleChanged(newValue) {
            if (this.selectedMemberIndex !== null) {
                this.familyMembers[this.selectedMemberIndex].role = newValue;
            }
        },
    },

    methods: {
        selectMember(index) {
            if (this.selectedMemberIndex !== null) {
                this.familyMembers[this.selectedMemberIndex].selected = false;
            }
            this.selectedMemberIndex = index;
            this.familyMembers[index].selected = true;
            this.selectedMemberRole = this.familyMembers[index].role;
        },
        updateRole() {
            if (this.selectedMemberIndex !== null) {
                this.familyMembers[this.selectedMemberIndex].role = this.selectedMemberRole;
            }
        },
        getRoleColor(role) {
            switch (role.toLowerCase()) {
                case 'padre':
                    return '#4F439A';
                case 'madre':
                    return '#E871B5';
                case 'encargado':
                    return '#56A8B9';
                case 'invitado':
                    return '#FEBD54';
                default:
                    return '#000000';
            }
        },
        updateRole() {
            if (this.selectedMemberIndex !== null) {
                this.familyMembers[this.selectedMemberIndex].role = this.selectedMemberRole;
            }
        },
    },
};
</script>