<template>
    <div 
        class="noteContainer component"
        :style="{left: `${x}px`, top: `${y}px`, width: `${width}px`, height: `${height}px`, position: 'absolute'}"
        @mousedown="isEditingNote"
        @mousemove="updateElementPosition"
        @mouseup="mouseUp"
        @dblclick="editing = true" 
        @blur="editing = false"
    >
    <textarea v-if="editing" v-model="noteContent" @blur="emitNoteNewContent" @keyup.enter.prevent="emitNoteNewContent"></textarea>


        <p v-else>{{ noteContent }}</p>
        <div class="resize-handle" @mousedown.stop="initNoteResizing" @mousemove.stop="resizeNote" @mouseup.stop="stopNoteResizing"></div>
    </div>
</template>

<script setup>
    // Necessary imports from Vue.js
    import { ref, nextTick, onMounted, onUnmounted } from 'vue';
    // Import the drag and drop function
    import { dragElement } from '../dragElement';

    // Define the component properties
    const props = defineProps({
        note: Object
    });

    // Initialize variables needed for moving the element
    let { x, y, mouseDown, mouseMove, mouseUp } = dragElement();

    // Initialize variables for the width, height, editing state, resizing state and note content
    let width = ref();
    let height = ref();
    let editing = ref(false);
    let resizing = ref(false);
    let noteContent = ref('');

    /**
    * Vue.js lifecycle hook - onMounted
    * It sets initial values after the component is mounted.
    */
    onMounted(async () => {
        await nextTick();
        x.value = props.note.currentXLocation;
        y.value = props.note.currentYLocation;
        noteContent.value = props.note.noteContent;
        width.value = props.note.currentWidth;
        height.value = props.note.currentHeight;
    });

    /**
    * Vue.js lifecycle hook - onUnmounted
    * It removes the event listeners when the component is unmounted.
    */
    onUnmounted(() => {
        removeEventListenersWhenDoneResizing();
    });

    // Define the custom events to emit
    const emit = defineEmits(['update-position', 'update-content', 'update-size']);

    /**
    * Function to update the position of the element
    * @param {Event} event - The triggered DOM event.
    */
    const updateElementPosition = (event) => {
        mouseMove(event);
        emit('update-position', { id: props.note.id, x: x.value, y: y.value });
    };

    /**
    * Function to emit the new content of the note
    * @param {Event} event - The triggered DOM event.
    */
    const emitNoteNewContent = (event) => {
        console.log('emitNoteNewContent called');
        emit('update-content', { id: props.note.id, content: noteContent.value });
        console.log('event emitted');
        editing.value = false;
    };

    /**
    * Function to check if the note is in editing state and perform mouseDown if it's not.
    * @param {Event} event - The triggered DOM event.
    */
    const isEditingNote = (event) => {
        if (!editing.value) {
            mouseDown(event);
        }
    };

    /**
    * Function to initialize the resizing of the note
    * @param {Event} event - The triggered DOM event.
    */
    const initNoteResizing = (event) => {
        resizing.value = true;
        event.preventDefault(),

        window.addEventListener('mousemove', resizeNote);
        window.addEventListener('mouseup', stopNoteResizing);
    };

    /**
    * Function to resize the note during mousemove
    * @param {Event} event - The triggered DOM event.
    */
    const resizeNote = (event) => {
        if (resizing.value) {
            width.value = event.clientX - x.value;
            height.value = event.clientY - y.value;
        }
    };

    /**
    * Function to stop resizing the note
    */
    const stopNoteResizing = () => {
        emitNoteNewSize();
        resizing.value = false;
        removeEventListenersWhenDoneResizing();
    };

    /**
    * Function to remove the event listeners when done resizing
    */
    const removeEventListenersWhenDoneResizing = () => {
        window.removeEventListener('mousemove', resizeNote);
        window.removeEventListener('mouseup', stopNoteResizing);
    };

    /**
    * Function to emit the new size of the note
    */
    const emitNoteNewSize = () => {
        emit('update-size', { id: props.note.id, width: width.value, height: height.value });
    }
</script>

<style>
    .noteContainer {
        border: 1px solid #44444427;
        padding: 10px;
        position: relative;
    }

    .noteContainer textarea {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        resize: none;
    }

    .resize-handle {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 20px;
        height: 20px;
        cursor: se-resize;
        background: #ccc;
    }
</style>
