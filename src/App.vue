<script setup>
    import { ref } from 'vue';
    import Board from './components/Board.vue'

    let boardCreated = ref(false);
    let boardName = ref('My awesome new board');
    let editing = ref(false);

    let boards = ref([])

    const createBoard = () => {
        boardCreated.value = true;
        const newBoard = {
            id: boards.value.length,
            name: boardName.value,
            created: new Date(),
            checklists: [],
            notes: [],
        }
        boards.value.push(newBoard);
        currentBoard.value = newBoard;
        console.log(currentBoard.value);
    }

    let currentBoard = ref(null);
    const selectBoard = (board) => {
        currentBoard.value = board;
    }
</script>

<template>
    <section class="appSkeleton">
        <header>
            <div v-if="boardCreated">
                <div class="boardMenu">
                    <div v-if="!editing" class="boardName" @click="editing = true">
                        {{ boardName }}
                    </div>
                    <input v-else type="text" class="boardName-editing" v-model="boardName" @keyup.enter="editing = false" @blur="editing = false">
                </div>
            </div>
            <div v-else class="drawNewBoard" @click="createBoard">Create new board</div>
        </header>

        <main>
            <div class="boardContainer" v-if="boardCreated">
                <Board v-if="currentBoard" :board="currentBoard" />
            </div>
        </main>
    </section> 
</template>

<style scoped>

.appSkeleton {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
}

.drawNewBoard {
    border: 1px solid rgba(128, 128, 128, 0.208);
    padding: 0.5em 1em 0.5em 1em;
    border-radius: 3px;
    transition: all 0.1s ease-in-out;
}

.boardName-editing {
    border: none;
    background: none;
    text-align: center;
    font-size: 15px;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    color: var(--color-text);
    line-height: 1.6;
}

.drawNewBoard:hover {
    cursor: pointer;
    background-color: rgba(128, 128, 128, 0.208);
    color: white;
}
.boardContainer {
    height: 800px;
    min-height: 800px;
    max-height: none;
    width: 1700px;
}
</style>
