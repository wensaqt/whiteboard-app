<template>
    <div 
        class="checklistContainer component"
        :style="{left: `${x}px`, top: `${y}px`, position: 'absolute'}"
        @mousedown="mouseDown"
        @mousemove="updateElementPosition"
        @mouseup="mouseUp"
    >
        <div class="tasks">
            <div class="task" v-for="(task, index) in tasks" :key="index">
                {{ task.value }}
                <div class="taskIcons">
                    <div class="checkmark" :class="{ 'is-checked': task.checked }" @click="checkTask(index)"></div>
                    <font-awesome-icon icon="trash" class="trashIcon" @click="dropTask(index)" />
                </div>
            </div>
        </div>

        <div class="addNewTask" @mousedown.stop>
            <input type="text" v-model="newTask" placeholder="Add new task...">
            <font-awesome-icon  class="addNewTask-button" @click="addNewTask" :icon="['fas', 'plus']" />
        </div>
    </div>
</template>

<script setup>
    import { ref, nextTick, onMounted } from 'vue';
    import { dragElement } from '../dragElement';

    const props = defineProps({
        checklist: Object
    });

    let { x, y, mouseDown, mouseMove, mouseUp } = dragElement();
    let tasks = ref([]);
    let newTask = ref('');

    onMounted(async () => {
    await nextTick();
        x.value = props.checklist.currentXLocation;
        y.value = props.checklist.currentYLocation;
    });

    const addNewTask = () => {
        if (newTask.value.trim() !== '') {
            tasks.value.push({ value: newTask.value, checked: false });
            newTask.value = '';
        }
    }

    const checkTask = (index) => {
        tasks.value[index].checked = !tasks.value[index].checked;
    }

    const dropTask = (index) => {
        tasks.value.splice(index, 1);
    }

    const emit = defineEmits(['update-position']);

    const updateElementPosition = (event) => {
        mouseMove(event);
        emit('update-position', { id: props.checklist.id, x: x.value, y: y.value });
    };
    
</script>



<style>
    .checklistContainer {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tasks {
        width: 800px;
        display: flex;
        flex-direction: column;
        gap: 1em;
        border: 1px solid rgba(128, 128, 128, 0.295);
        border-radius: 5px;
        padding: 2em;
    }

    .task {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: black;
        padding: 0.3em;
        font-size: 2em;
        font-weight: 100;
        border-radius: 5px;
    }

    .task:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.076);
    }

    .taskIcons {
        display: flex;
        gap: 1em;
        align-items: center;
    }

    .checkmark {
        height: 20px;
        width: 20px;
        border: 1px solid grey;
        border-radius: 5px;
    }

    .trashIcon {
        height: 20px;
        width: 20px;
        visibility: hidden;
        padding: 0.5em;
        transition: transform 0.1s ease-in-out;
    }

    .task:hover .trashIcon {
        visibility: visible;
    }

    .trashIcon:hover {
        transform: scale(1.2);
    }

    .checkmark.is-checked {
        background-color: green;
    }

    .addNewTask {
        margin-top: 20px;
        display: flex;
        width: 800px;
        justify-content: center;
        gap: 1em;
    }

    .addNewTask > input {
        height: 30px;
        width: 70%;
    }

    .addNewTask-button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 15px;
        width: 15px;
        padding: 0.5em;
        color: white;
        background-color: rgba(0, 0, 0, 0.718);
        border-radius: 100%;
    }

    .addNewTask-button > p {
        text-align: center;
    }

    .addNewTask-button:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.505);
    }
</style>