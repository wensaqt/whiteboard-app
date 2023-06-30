<template>
    <div 
        class="noteContainer component"
        :style="{left: `${x}px`, top: `${y}px`, position: 'absolute'}"
        @mousedown="mouseDown"
        @mousemove="updateElementPosition"
        @mouseup="mouseUp"
        @dblclick="editing = true" 
        @blur="editing = false"
    >
        <textarea v-if="editing" v-model="noteContent" @keyup.enter="editing = false" @blur="editing = false"></textarea>
        <p v-else>{{ noteContent }}</p>
    </div>
</template>

<script setup>
    import { ref, nextTick, onMounted } from 'vue';
    import { dragElement } from '../dragElement'; // import the useDraggable function

    const props = defineProps({
        note: Object
    });

    let { x, y, mouseDown, mouseMove, mouseUp } = dragElement(); // use the draggable functions

    let noteContent = ref("Click twice to edit note...");
    let editing = ref(false);

    onMounted(async () => {
        await nextTick();
        x.value = props.note.currentXLocation;
        y.value = props.note.currentYLocation;
    });

    const emit = defineEmits(['update-position']);

    const updateElementPosition = (event) => {
        mouseMove(event);
        emit('update-position', { id: props.note.id, x: x.value, y: y.value });
    };

</script>

<style>
    .noteContainer {
        border: 1px solid #44444427;
        padding: 10px;
        width: 200px;
        height: 200px;
        position: relative;
    }
    .noteContainer textarea {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        resize: none;
    }
</style>
