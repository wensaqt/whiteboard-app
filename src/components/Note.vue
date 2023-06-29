<template>
    <div 
        class="noteContainer"
        :style="{left: `${x}px`, top: `${y}px`, position: 'absolute'}"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
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

    const props = defineProps({
        Note: Object
    });

    const emit = defineEmits(['update-position']);

    let noteContent = ref("Click twice to edit note...");
    let editing = ref(false);
    let x = ref(0);
    let y = ref(0);
    let offsetX = ref(0);
    let offsetY = ref(0);
    let isDragging = ref(false);

    onMounted(async () => {
        await nextTick();

        x.value = 0;
        y.value = 0;
    });

    const mouseDown = (event) => {
        if (!editing.value) {
            isDragging.value = true;
            offsetX.value = event.clientX - x.value;
            offsetY.value = event.clientY - y.value;
            event.preventDefault();
        }
    }

    const mouseMove = (event) => {
        if (!editing.value && isDragging.value) {
            // get the dimensions of the parent
            let parentRect = document.querySelector('.board').getBoundingClientRect();
            let noteRect = document.querySelector('.noteContainer').getBoundingClientRect();

            // calculate the new position
            let newX = event.clientX - offsetX.value;
            let newY = event.clientY - offsetY.value;

            // ensure the note stays within the parent
            if (newX < parentRect.left) newX = parentRect.left;
            if (newY < parentRect.top) newY = parentRect.top;
            if (newX > parentRect.right - noteRect.width) newX = parentRect.right - noteRect.width;
            if (newY > parentRect.bottom - noteRect.height) newY = parentRect.bottom - noteRect.height;

            x.value = newX;
            y.value = newY;

            emit('update-position', { x: newX, y: newY });
        }
    }

    const mouseUp = (event) => {
        if (!editing.value && isDragging.value) {
            isDragging.value = false;
        }
    }
</script>

<style>
    .noteContainer {
        border: 1px solid #333;
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
