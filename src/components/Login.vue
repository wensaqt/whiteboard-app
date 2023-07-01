<template>
    <div class="loginContainer">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <label>
                Username:
                <input v-model="username" type="text" required />
            </label>
            <label>
                Password:
                <input v-model="password" type="password" required />
            </label>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script setup>
    import { ref, defineEmits } from 'vue';

    defineEmits(['login']);

    const username = ref('');
    const password = ref('');
    const error = ref(''); 

    const login = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value
                })
            });

            if (response.ok) {
                const data = await response.json();
                emit('login', {
                    username: username.value,
                    password: password.value
                });
            } else {
                const errorData = await response.json();
                error.value = errorData.error;
            }
        } catch (error) {
            error.value = 'Une erreur est survenue lors de la connexion.';
            console.log(error);
        }
    };
</script>

<style scoped>
    .loginContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .loginContainer h2 {
        margin-bottom: 10px;
        font-weight: bold;
    }

    .loginContainer label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
    }

    .loginContainer input[type="text"],
    .loginContainer input[type="password"] {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .loginContainer button {
        padding: 10px 20px;
        background-color: #333333;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .loginContainer button:hover {
        background-color: #555555;
    }
    .error {
        color: red;
        margin-top: 10px;
    }
</style>