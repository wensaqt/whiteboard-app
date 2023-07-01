<template>
    <div class="board">
        <div class="boardComponents">
            <font-awesome-icon :icon="['fas', 'list']" class="addChecklist boardComponent" @click="createChecklist"/>
            <font-awesome-icon :icon="['fas', 'sticky-note']" class="boardComponent" @click="createNote"/>
        </div>
        <Checklist 
            v-for="(checklist, index) in board.checklists" 
            :key="index" 
            :checklist="checklist"
            @update-position="updateChecklistPosition"
            @update-tasks="updateChecklistTasks"
        />
        <Note
            v-for="(note, index) in board.notes" 
            :key="index"
            :note="note"
            @update-position="updateNotePosition"
            @update-content="updateNoteContent"
            @update-size="updateNoteSize"
        />
    </div>
</template>


<script setup>

    import Checklist from './Checklist.vue';
    import Note from './Note.vue';

    const props = defineProps({
        board: Object,
    });

    /**
     * Creates a new checklist and adds it to the board's checklist array.
     */
    const createChecklist = () => {
        const newChecklist = {
            id: props.board.checklists.length,
            tasks: [],
            currentXLocation: 0,
            currentYLocation: 0
        };
        props.board.checklists.push(newChecklist);
        console.log(props.board.checklists);
    }

    /**
     * Updates the position of a specific checklist on the board.
     *
     * @param {Object} param0 - An object containing the ID and coordinates of the checklist.
     * @param {number} param0.id - The ID of the checklist.
     * @param {number} param0.x - The new X position of the checklist.
     * @param {number} param0.y - The new Y position of the checklist.
     */
    const updateChecklistPosition = ({ id, x, y }) => {
        const checklist = props.board.checklists.find(checklist => checklist.id === id);
        if (checklist) {
            checklist.currentXLocation = x;
            checklist.currentYLocation = y;
        }
    }

    /**
     * Updates the tasks of a specific checklist on the board.
     *
     * @param {number} id - The ID of the checklist.
     * @param {Array} tasks - The new tasks for the checklist.
     */
    const updateChecklistTasks = (id, tasks) => {
        const checklist = props.board.checklists.find(checklist => checklist.id === id);
        if (checklist) {
            checklist.tasks = tasks;
        }
    }

    /**
     * Creates a new note and adds it to the board's notes array.
     */
    const createNote = () => {
        const newNote = {
            id: props.board.notes.length,
            currentXLocation: 0,
            currentYLocation: 0,
            currentHeight: 200,
            currentWidth: 200,
            noteContent: 'Click twice to edit note...'
        };
        props.board.notes.push(newNote)
        console.log(props.board.notes)
    }

    /**
     * Updates the position of a specific note on the board.
     *
     * @param {Object} param0 - An object containing the ID and coordinates of the note.
     * @param {number} param0.id - The ID of the note.
     * @param {number} param0.x - The new X position of the note.
     * @param {number} param0.y - The new Y position of the note.
     */
    const updateNotePosition = ({ id, x, y }) => {
        const note = props.board.notes.find(note => note.id === id);
        if (note) {
            note.currentXLocation = x;
            note.currentYLocation = y;
        }
    }

    /**
     * Updates the content of a specific note on the board.
     *
     * @param {Object} param0 - An object containing the ID and new content of the note.
     * @param {number} param0.id - The ID of the note.
     * @param {string} param0.content - The new content for the note.
     */
    const updateNoteContent = ({ id, content }) => {
        const note = props.board.notes.find(note => note.id === id);
        if (note) {
        note.noteContent = content;
        console.log('note content updated !')
        }
    };

    /**
     * Updates the size of a specific note on the board.
     *
     * @param {Object} param0 - An object containing the ID and new size of the note.
     * @param {number} param0.id - The ID of the note.
     * @param {number} param0.width - The new width of the note.
     * @param {number} param0.height - The new height of the note.
     */
    const updateNoteSize = ({ id, width, height }) => {
        const note = props.board.notes.find(note => note.id === id);
        if (note) {
            note.currentWidth = width;
            note.currentHeight = height;
        }
    };

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