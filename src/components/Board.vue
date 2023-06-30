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
        />
    </div>
</template>


<script setup>

    import Checklist from './Checklist.vue';
    import Note from './Note.vue';

    const props = defineProps({
        board: Object,
    });

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

    const updateChecklistPosition = ({ id, x, y }) => {
        const checklist = props.board.checklists.find(checklist => checklist.id === id);
        if (checklist) {
            checklist.currentXLocation = x;
            checklist.currentYLocation = y;
        }
    }

    const updateChecklistTasks = (id, tasks) => {
        const checklist = props.board.checklists.find(checklist => checklist.id === id);
        if (checklist) {
            checklist.tasks = tasks;
        }
    }


    const createNote = () => {
        const newNote = {
            id: props.board.notes.length,
            currentXLocation: 0,
            currentYLocation: 0,
            currentHeight: 0,
            currentWidth: 0,
            noteContent: 'Click twice to edit note...'
        };
        props.board.notes.push(newNote)
        console.log(props.board.notes)
    }

    const updateNotePosition = ({ id, x, y }) => {
        const note = props.board.notes.find(note => note.id === id);
        if (note) {
            note.currentXLocation = x;
            note.currentYLocation = y;
        }
    }

    const updateNoteContent = ({ id, content }) => {
        const note = props.board.notes.find(note => note.id === id);
        if (note) {
        note.noteContent = content;
        console.log('note content updated !')
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