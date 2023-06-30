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
    import { ref, nextTick, onMounted, onUnmounted } from 'vue';
    import { dragElement } from '../dragElement';

    const props = defineProps({
        note: Object
    });

    let { x, y, mouseDown, mouseMove, mouseUp } = dragElement();

    let width = ref();
    let height = ref();
    let editing = ref(false);
    let resizing = ref(false);
    let noteContent = ref('');

    onMounted(async () => {
        await nextTick();
        x.value = props.note.currentXLocation;
        y.value = props.note.currentYLocation;
        noteContent.value = props.note.noteContent;
        width.value = props.note.currentWidth;
        height.value = props.note.currentHeight;

    });

    onUnmounted(() => {
        removeEventListenersWhenDoneResizing();
    });

    const emit = defineEmits(['update-position', 'update-content', 'update-size']);

    const updateElementPosition = (event) => {
        mouseMove(event);
        emit('update-position', { id: props.note.id, x: x.value, y: y.value });
    };

    const emitNoteNewContent = (event) => {
        console.log('emitNoteNewContent called');
        emit('update-content', { id: props.note.id, content: noteContent.value });
        console.log('event emitted');
        editing.value = false;
    };

    const isEditingNote = (event) => {
        if (!editing.value) {
            mouseDown(event);
        }
    };

    const initNoteResizing = (event) => {
        resizing.value = true;
        event.preventDefault(),

        window.addEventListener('mousemove', resizeNote);
        window.addEventListener('mouseup', stopNoteResizing);
    };

    const resizeNote = (event) => {
        if (resizing.value) {
            width.value = event.clientX - x.value;
            height.value = event.clientY - y.value;
        }
    };

    const stopNoteResizing = () => {
        emitNoteNewSize();
        resizing.value = false;
        removeEventListenersWhenDoneResizing();
    };

    const removeEventListenersWhenDoneResizing = () => {
        window.removeEventListener('mousemove', resizeNote);
        window.removeEventListener('mouseup', stopNoteResizing);
    };

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
