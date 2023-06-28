<template>
    <div 
    class="checklistContainer"
        :style="{left: `${x}px`, top: `${y}px`, position: 'absolute'}"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
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
            <div class="addNewTask-button" @click="addNewTask"><p>+</p></div>
        </div>
    </div>
</template>

<script setup>
    import { ref, nextTick, onMounted } from 'vue';

    const props = defineProps({
        checklist: Object
    });

    let tasks = props.checklist.tasks;
    let newTask = ref('');
    let x = ref(0);
    let y = ref(0);
    let offsetX = ref(0);
    let offsetY = ref(0);
    let isDragging = ref(false);

    onMounted(async () => {
    await nextTick();

    let boardRect = document.querySelector('.board').getBoundingClientRect();
    let checklistRect = document.querySelector('.checklistContainer').getBoundingClientRect();

    x.value = boardRect.width / 2 - checklistRect.width / 2;
    y.value = boardRect.height / 2 - checklistRect.height / 2;
});

    const addNewTask = () => {
        if (newTask.value.trim() !== '') {
            // Push the new task to the tasks array
            tasks.push({ value: newTask.value, checked: false });
            newTask.value = '';
        }
        console.log(props.board.checklist)
    }

    const checkTask = (index) => {
        tasks[index].checked = !tasks[index].checked;
    }

    const dropTask = (index) => {
        tasks.splice(index, 1);
    }

    const mouseDown = (event) => {
        isDragging.value = true;
        offsetX.value = event.clientX - x.value;
        offsetY.value = event.clientY - y.value;
        event.preventDefault();
    }

    const mouseMove = (event) => {
        if (isDragging.value) {
            // get the dimensions of the board and checklist
            let boardRect = document.querySelector('.board').getBoundingClientRect();
            let checklistRect = document.querySelector('.checklistContainer').getBoundingClientRect();

            // calculate the new position
            let newX = event.clientX - offsetX.value;
            let newY = event.clientY - offsetY.value;

            // ensure the checklist stays within the board
            if (newX < boardRect.left) newX = boardRect.left;
            if (newY < boardRect.top) newY = boardRect.top;
            if (newX > boardRect.right - checklistRect.width) newX = boardRect.right - checklistRect.width;
            if (newY > boardRect.bottom - checklistRect.height) newY = boardRect.bottom - checklistRect.height;

            x.value = newX;
            y.value = newY;
        }
    }

    const mouseUp = (event) => {
        if (isDragging.value) {
            isDragging.value = false;
        }
    }
    
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
        height: 30px;
        width: 30px;
        font-size: 1em;
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