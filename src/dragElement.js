import { ref } from 'vue';

/**
 * A Vue composition API function to handle drag and drop functionality.
 * @returns {Object} The x and y coordinates of the element and functions to handle mouse down, move and up events.
 */
export function dragElement() {
    // Create refs for the x and y coordinates, offsets and dragging state
    const x = ref(0);
    const y = ref(0);
    const offsetX = ref(0);
    const offsetY = ref(0);
    const isDragging = ref(false);
    let currentElement = null;

    /**
     * Handles the mousedown event.
     * @param {Object} event - The mousedown event.
     */
    const mouseDown = (event) => {
        isDragging.value = true;
        currentElement = event.target;
        offsetX.value = event.clientX - x.value;
        offsetY.value = event.clientY - y.value;
        event.preventDefault();
    }

    /**
     * Handles the mousemove event.
     * @param {Object} event - The mousemove event.
     */
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

    /**
     * Handles the mouseup event.
     */
    const mouseUp = () => {
        isDragging.value = false;
        currentElement = null; 
    }

    return { x, y, mouseDown, mouseMove, mouseUp };
}