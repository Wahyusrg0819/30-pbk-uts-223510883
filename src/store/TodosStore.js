import { defineStore } from 'pinia';

export const useTodosStore = defineStore({
  id: 'todos',
  state: () => ({
    todos: []
  }),
  actions: {
    addTodo(todo) {
      this.todos.push(todo);
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
});
