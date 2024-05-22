<template>
    <section class="todos-section">
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
          <button @click="filterCompleted = !filterCompleted">
            {{ filterCompleted ? 'Tampilkan Semua' : 'Tampilkan Belum selesai' }}
          </button>
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
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
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
  </script>

  <style scoped>
.filter {
  margin-bottom: 10px;
}

.filter button {
  background-color: #7900ff; 
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



</style>
  