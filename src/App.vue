<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">TodoList-Wahyu Siregar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" @click="selectedMenu = 'Todos'" :class="{ 'active': selectedMenu === 'Todos' }">Todos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="selectedMenu = 'Post'" :class="{ 'active': selectedMenu === 'Post' }">Post</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <main class="app">
    <Todos v-if="selectedMenu === 'Todos'" />
    <Post v-else-if="selectedMenu === 'Post'" title="User Posts">
      <template #description>
        <p>Pilih user dari dropdown untuk melihat postingan mereka.</p>
      </template>
    </Post>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import Todos from './components/Todos.vue'
import Post from './components/Post.vue'

const selectedMenu = ref('Todos')
</script>

<style>
/* Tambahkan styling sesuai kebutuhan */
</style>



<style scoped>
header {
  background-color: var(--primary);
  padding: 1rem;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
}

nav ul li {
  margin-right: 1rem;
}

</style>