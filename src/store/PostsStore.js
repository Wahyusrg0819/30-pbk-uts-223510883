import { defineStore } from 'pinia';

export const usePostsStore = defineStore({
  id: 'posts',
  state: () => ({
    posts: []
  }),
  actions: {
    addPost(post) {
      this.posts.push(post);
    },
    removePost(index) {
      this.posts.splice(index, 1);
    }
  }
});
