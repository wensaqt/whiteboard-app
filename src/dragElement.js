import { ref } from 'vue';

export function dragElement() {
    const x = ref(0);
    const y = ref(0);
    const offsetX = ref(0);
    const offsetY = ref(0);
    const isDragging = ref(false);
    let currentElement = null;

    const mouseDown = (event) => {
        isDragging.value = true;
        currentElement = event.target;
        offsetX.value = event.clientX - x.value;
        offsetY.value = event.clientY - y.value;
        event.preventDefault();
    }

    const mouseMove = (event) => {
        if (isDragging.value) {
            let parentRect = document.querySelector('.board').getBoundingClientRect();
            let noteRect = currentElement.getBoundingClientRect();

            let newX = event.clientX - offsetX.value;
            let newY = event.clientY - offsetY.value;

            if (newX < parentRect.left) newX = parentRect.left;
            if (newY < parentRect.top) newY = parentRect.top;
            if (newX > parentRect.right - noteRect.width) newX = parentRect.right - noteRect.width;
            if (newY > parentRect.bottom - noteRect.height) newY = parentRect.bottom - noteRect.height;

            x.value = newX;
            y.value = newY;
        }
    }

    const mouseUp = () => {
        isDragging.value = false;
        currentElement = null; 
    }

    return { x, y, mouseDown, mouseMove, mouseUp };
}