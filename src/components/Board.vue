<template>
    <div class="board">
        <div class="boardComponents">
            <font-awesome-icon :icon="['fas', 'list']" class="addChecklist boardComponent" @click="createChecklist"/>
            <font-awesome-icon :icon="['fas', 'sticky-note']" class="boardComponent" />
        </div>
        <Checklist v-for="(checklist, index) in checklists" :key="index"/>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import Checklist from './Checklist.vue';

    let checklists = ref([]);
    let notes = ref([]);

    const createChecklist = () => {
        checklists.value.push({});
    }

</script>

<style>
    .board {
        height: 100%;
        width: 100%;
        background-color: white;
        border: 1px solid rgba(128, 128, 128, 0.377);
        border-radius: 5px;
    }

    .boardComponents {
        display: flex;
        padding: 1em;
        gap: 1em;
    }
    

    .boardComponent {
        height: 20px;
        width: 20px;
        background-color: rgba(0, 0, 0, 0.505);
        padding: 0.5em;
        border-radius: 100%;
        color: white;
        transition: transform 0.1s ease-in-out;
    }

    .boardComponent:hover {
        cursor: pointer;
        transform: scale(1.2);
    }
</style>