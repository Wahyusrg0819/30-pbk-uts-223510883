<template>

<header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">TodoList-Wahyu_Siregar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click="selectedMenu = 'Todos'" :class="{ 'active': selectedMenu === 'Todos' }">Todos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click="selectedMenu = 'Post'" :class="{ 'active': selectedMenu === 'Post' }">Post</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>


  <main class="app">
    <!-- Header -->
    

    <!-- Section for Todos or Posts -->
    <section v-if="selectedMenu === 'Todos'" class="todos-section">
      <section class="greeting">
        <h2 class="title">
          Hello, <input class="text" type="text" placeholder="Buat nama disini" v-model="name" />
        </h2>
      </section>

      <section class="create-todo">
        <h3>Buat Kegiatan</h3>

        <form @submit.prevent="addTodo">
          <h4>Apa isi daftar kegiatan mu?</h4>
          <input type="text" placeholder="contoh [membaca Buku]" v-model="input_content" />
          <input type="submit" value="Tambah Kegiatan" />
        </form>
      </section>

      <section class="todo-list">
        <h3>Daftar Kegiatan</h3>

        <div class="filter">
          <button @click="filterCompleted = !filterCompleted">{{ filterCompleted ? 'Tampilkan Semua' : 'Tampilkan Belum selesai' }}</button>
        </div>

        <div class="list">
          <div v-for="todo in filteredTodos" :key="todo.createdAt" :class="`todo-item ${todo.done && 'done'}`">
            <label>
              <input type="checkbox" v-model="todo.done" />
              <span :class="`bubble ${todo.category}`"></span>
            </label>

            <div class="todo-content">
              <input type="text" v-model="todo.content" />
            </div>

            <div class="actions">
              <button class="delete" @click="removeTodo(todo)">Delete</button>
            </div>
          </div>
        </div>
      </section>
    </section>

    <section v-else-if="selectedMenu === 'Post'" class="post-section">

       <!-- Loader -->
  <div v-if="loading" class="loader">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>

      <h3>Pilih User</h3>
      <select v-model="selectedUser">
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>
      <div class="post-list">
        <div v-for="post in filteredPosts" :key="post.id" class="post-item">
          <h4>{{ post.title }}</h4>
          <p>{{ post.body }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const selectedMenu = ref('Todos')
const selectedUser = ref(null)
const users = ref([])
const posts = ref([])
const loading = ref(false) // Menandai saat loading sedang berlangsung
const name = ref('')
const input_content = ref('')
const filterCompleted = ref(false)

const todos = ref([])

const todos_asc = computed(() => todos.value.sort((a, b) => b.createdAt - a.createdAt))
const filteredTodos = computed(() => filterCompleted.value ? todos_asc.value.filter(todo => !todo.done) : todos_asc.value)

const addTodo = () => {
  if (input_content.value.trim() === '') return
  todos.value.push({ content: input_content.value, done: false, createdAt: new Date().getTime() })
  input_content.value = ''
}

const removeTodo = todo => {
  const index = todos.value.findIndex(t => t === todo)
  if (index !== -1) todos.value.splice(index, 1)
}

const filteredPosts = computed(() => {
  if (!selectedUser.value) return posts.value
  return posts.value.filter(post => post.userId === selectedUser.value)
})

const handleUserChange = () => {
  loading.value = true; // Menandai loading saat pemilihan user
}

onMounted(async () => {
  // Fetch users and posts data from the API
  const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users')
  const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts')
  users.value = await usersResponse.json()
  posts.value = await postsResponse.json()
  loading.value = false; // Menandai loading selesai setelah data terambil
})
</script>


<style scoped>

.filter {
  margin-bottom: 10px;
}

.filter button {
  background-color: #7900ff; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}

.filter button:hover {
  background-color: #45a049;
}

/* CSS for the buttons in the header */

header {
  background-color: var(--primary);
  padding: 1rem;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center; /* Center vertically */
}

nav ul li {
  margin-right: 1rem;
}

/* CSS for the loader animation */
.loader {
  width: 200px;
  height: 200px;
  perspective: 200px;
  margin: 0 auto; /* Centering the loader */
}

.dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  margin-top: -60px;
  margin-left: -60px;
  border-radius: 100px;
  border: 40px outset #1e3f57;
  transform-origin: 50% 50%;
  transform: rotateX(24deg) rotateY(20deg) rotateZ(0deg) translateZ(-25px);
  background-color: transparent;
  animation: dot1 1000ms cubic-bezier(.49,.06,.43,.85) infinite;
}

.dot:nth-child(2) {
  width: 140px;
  height: 140px;
  margin-top: -70px;
  margin-left: -70px;
  border-width: 30px;
  border-color: #447891;
  animation-name: dot2;
  animation-delay: 75ms;
  box-shadow: inset 0 0 15px 0 rgba(0, 0, 0, 0.1);
  transform: rotateX(24deg) rotateY(20deg) rotateZ(0deg) translateZ(-25px);
}

.dot:nth-child(3) {
  width: 160px;
  height: 160px;
  margin-top: -80px;
  margin-left: -80px;
  border-width: 20px;
  border-color: #6bb2cd;
  animation-name: dot3;
  animation-delay: 150ms;
  box-shadow: inset 0 0 15px 0 rgba(0, 0, 0, 0.1);
  transform: rotateX(24deg) rotateY(20deg) rotateZ(0deg) translateZ(-25px);
}

@keyframes dot1 {
  0% {
    border-color: #1e3f57;
    transform: rotateX(24deg) rotateY(20deg) rotateZ(0deg) translateZ(-25px);
  }

  50% {
    border-color: #1e574f;
    transform: rotateX(20deg) rotateY(20deg) rotateZ(50deg) translateZ(0px);
  }

  100% {
    border-color: #1e3f57;
    transform: rotateX(24deg) rotateY(20deg) rotateZ(0deg) translateZ(-25px);
  }
}

@keyframes dot2 {
  0% {
    border-color: #447891;
    box-shadow: inset 0 0 15px 0 rgba(255, 255, 255, 0.2);
    transform: rotateX(24deg) rotateY(20deg) rotateZ(0deg) translateZ(-25px);
  }

  50% {
    border-color: #449180;
    box-shadow: inset 0 0 15px 0 rgba(0, 0, 0, 0.8);
    transform: rotateX(20deg) rotateY(20deg) rotateZ(50deg) translateZ(0px);
  }

  100% {
    border-color: #447891;
    box-shadow: inset 0 0 15px 0 rgba(255, 255, 255, 0.2);
    transform: rotateX(24deg) rotateY(20deg) rotateZ(0deg) translateZ(-25px);
  }
}

@keyframes dot3 {
  0% {
    border-color: #6bb2cd;
    box-shadow: inset 0 0 15px 0 rgba(0, 0, 0, 0.1);
    transform: rotateX(24deg) rotateY(20deg) rotateZ(0deg) translateZ(-25px);
  }

  50% {
    border-color: #6bcdb2;
    box-shadow: inset 0 0 15px 0 rgba(0, 0, 0, 0.8);
    transform: rotateX(20deg) rotateY(20deg) rotateZ(50deg) translateZ(0px);
  }

  100% {
    border-color: #6bb2cd;
    box-shadow: inset 0 0 15px 0 rgba(0, 0, 0, 0.1);
    transform: rotateX(24deg) rotateY(20deg) rotateZ(0deg) translateZ(-25px);
  }
}


</style>