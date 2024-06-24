<template>
  <div class="Body">
  <section class="todos-section">
    <section class="greeting">
      <h2 class="title">
        Hello....
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
            <button class="delete" @click="removeTodo(todo)">⨉</button>
          </div>
        </div>
      </div>
    </section>
  </section>
</div>
</template>

<script setup>
import { useTodosStore } from '../store/TodosStore';
import { ref, computed } from 'vue';

const todosStore = useTodosStore();
const input_content = ref('');
const filterCompleted = ref(false);

const filteredTodos = computed(() => filterCompleted.value ? todosStore.todos.filter(todo => !todo.done) : todosStore.todos);

const addTodo = () => {
  if (input_content.value.trim() === '') return;
  todosStore.addTodo({
    content: input_content.value,
    done: false,
    createdAt: new Date().getTime()
  });
  input_content.value = '';
};

const removeTodo = index => {
  todosStore.removeTodo(index);
};
</script>

  
  <style scoped>
  .title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 1px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: aliceblue;
  }

  h3 {
    font-size: 19px;
  margin-top: 1px;
  margin-bottom: 1px;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  color: aliceblue;
 }

  h4 {
    font-size: 19px;
    margin-top: 1px;
    margin-bottom: 1px;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    color: aliceblue;
  }

  .Body {
    margin: 3%;
  }

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
    