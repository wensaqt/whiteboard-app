<template>
    <div 
        class="checklistContainer component"
        :style="{left: `${x}px`, top: `${y}px`, position: 'absolute'}"
        @mousedown="mouseDown"
        @mousemove="updateElementPosition"
        @mouseup="mouseUp"
    >
        <div class="tasks">
            <div class="task" v-for="(task, index) in props.checklist.tasks" :key="index">
                {{ task.value }}
                <div class="taskIcons">
                    <div class="checkmark" :class="{ 'is-checked': task.checked }" @click="checkTask(index)"></div>
                    <font-awesome-icon icon="trash" class="trashIcon" @click="dropTask(index)" />
                </div>
            </div>
        </div>

        <div class="addNewTask" @mousedown.stop>
            <input type="text" id="addNewTaskInput" v-model="newTask" placeholder="Add new task...">
            <font-awesome-icon  class="addNewTask-button" @click="addNewTask" :icon="['fas', 'plus']" />
        </div>
    </div>
</template>

<script setup>
    // Import necessary functionality from Vue.js
    import { ref, nextTick, onMounted } from 'vue';
    // Import the dragElement module
    import { dragElement } from '../dragElement';

    // Define the props for the component
    const props = defineProps({
        checklist: Object
    });

    // Use the dragElement functionality
    let { x, y, mouseDown, mouseMove, mouseUp } = dragElement();
    // Create a ref for a new task
    let newTask = ref('');

    // Define the events this component can emit
    const emit = defineEmits(['update-position', 'update-tasks']);

    /**
    * When the component is mounted, set the x and y values
    * to the current location of the checklist.
    */
    onMounted(async () => {
        await nextTick();
        x.value = props.checklist.currentXLocation;
        y.value = props.checklist.currentYLocation;
    });

    /**
    * Function to add a new task
    */
    const addNewTask = () => {
        if (newTask.value.trim() !== '') {
            props.checklist.tasks.push({value: newTask.value, checked: false});
            emitChecklistTaskOperations();
        }
    }

    /**
    * Function to check off a task
    * @param {number} index - The index of the task to check off
    */
    const checkTask = (index) => {
        props.checklist.tasks[index].checked = !props.checklist.tasks[index].checked;
        emitChecklistTaskOperations();
    }

    /**
    * Function to remove a task
    * @param {number} index - The index of the task to remove
    */
    const dropTask = (index) => {
        props.checklist.tasks.splice(index, 1);
        emitChecklistTaskOperations();
    }

    /**
    * Function to emit an event when a task operation occurs
    */
    const emitChecklistTaskOperations = () => {
        emit('update-tasks', props.checklist.id, props.checklist.tasks);
        newTask.value = '';
    }

    /**
    * Function to update the position of an element
    * @param {Object} event - The event object
    */
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