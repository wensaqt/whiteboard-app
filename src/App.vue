<script setup>
    import { ref } from 'vue';
    import Board from './components/Board.vue'

    let boardCreated = ref(false);
    let boardName = ref('My awesome new board');
    let editing = ref(false);

    let boards = ref([]);
    let currentBoard = ref(null);

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

    const selectBoard = (board) => {
        currentBoard.value = board;
    }

    const goBackToPreviousBoard = () => {
        if (currentBoard.value && boards.value.length > 1) {
            const currentIndex = boards.value.indexOf(currentBoard.value);
            const previousIndex = currentIndex > 0 ? currentIndex - 1 : boards.value.length - 1;
            currentBoard.value = boards.value[previousIndex];
        } 
    }

    const isCurrentBoardLastBoard = () => {
        if (currentBoard.value && boards.value.length > 0) {
            const lastIndex = boards.value.length - 1;
            return currentBoard.value === boards.value[lastIndex];
        }
        return false;
    }

    const goToNextBoard = () => {
    if (currentBoard.value && boards.value.length > 1) {
        const currentIndex = boards.value.indexOf(currentBoard.value);
        const nextIndex = currentIndex < boards.value.length - 1 ? currentIndex + 1 : 0;
        currentBoard.value = boards.value[nextIndex];
    }
}
</script>

<template>
    <section class="appSkeleton">
        <header>
            <div v-if="boardCreated">
                <div class="boardMenu">
                    <div v-if="!editing" class="boardName" @click="editing = true">
                        {{ currentBoard.name }}
                    </div>
                    <input v-else type="text" class="boardName-editing" v-model="currentBoard.name" @keyup.enter="editing = false" @blur="editing = false">
                </div>
            </div>
            <div v-else class="drawNewBoard" @click="createBoard">Create new board</div>
        </header>

        <main v-if="boardCreated">
            <div class="marge-left"><font-awesome-icon class="boardButtons addNewBoard-button" @click="goBackToPreviousBoard" :icon="['fas', 'chevron-left']" /></div>
            <div class="boardContainer">
                <Board v-if="currentBoard" :board="currentBoard" />
            </div>
            <div class="marge-right">
                <font-awesome-icon v-if="isCurrentBoardLastBoard()" class="boardButtons addNewBoard-button" @click="createBoard" :icon="['fas', 'plus']" />
<font-awesome-icon v-else class="boardButtons addNewBoard-button" @click="goToNextBoard" :icon="['fas', 'chevron-right']" />

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

main {
    display: flex;
}

.marge-left, .marge-right {
    width: 10vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.drawNewBoard {
    border: 1px solid rgba(128, 128, 128, 0.208);
    padding: 0.5em 1em 0.5em 1em;
    border-radius: 3px;
    transition: all 0.1s ease-in-out;
}

.boardButtons {
    height: 30px;
    width: 30px;
    padding: 0.5em;
    color: white;
    background-color: rgba(0, 0, 0, 0.718);
    border-radius: 100%;
    transition: transform 0.1s ease-in-out;
}

.boardButtons:hover {
    transform: scale(1.2);
    cursor: pointer;
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
    width: 80vw;
}

.boardMenu {
    display: flex;
    justify-content: space-between;
}

.boardMenu-buttons {
    margin-right: 0 auto;
}
</style>
