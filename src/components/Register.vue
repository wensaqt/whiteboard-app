<template>
    <div class="registerContainer">
        <h2>Register</h2>
        <form @submit.prevent="register">
            <label>
                Username:
                <input v-model="username" type="text" required />
            </label>
            <label>
                Email:
                <input v-model="email" type="email" required />
            </label>
            <label>
                Password:
                <input v-model="password" type="password" required />
            </label>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script setup>
    import { ref, defineEmits } from 'vue';
    import axios from 'axios';

    defineEmits(['register']);

    const username = ref('');
    const email = ref('');
    const password = ref('');
    // const error = ref('');

    const register = async () => {
        try {
            const response = await axios.post('/register', {
                username: username.value,
                email: email.value,
                password: password.value
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                emit('register', {
                    username: username.value,
                    email: email.value,
                    password: password.value
                });
            } else {
                error.value = 'Une erreur est survenue lors de l\'inscription.';
                console.log(response.data.error);
            }
        } catch (error) {
            error.value = 'Une erreur est survenue lors de l\'inscription.';
            console.log(error);
        }
    };
</script>

<style scoped>
    .registerContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .registerContainer label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
    }

    .registerContainer input[type="text"],
    .registerContainer input[type="email"],
    .registerContainer input[type="password"] {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .registerContainer button {
        padding: 10px 20px;
        background-color: #333333;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .registerContainer button:hover {
        background-color: #555555;
    }
    .error {
        color: red;
        margin-top: 10px;
    }
</style>