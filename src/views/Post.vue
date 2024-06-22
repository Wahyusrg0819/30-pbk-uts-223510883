<template>
  <div class="postBody">
    <section class="post-section">
      <div v-if="loading" class="loader">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <h3>{{ title }}</h3>
      <slot name="description"></slot>
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
  </div>
  </template>
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { usePostsStore } from '../store/PostsStore'; // Import store PostsStore
  
  const postsStore = usePostsStore(); // Gunakan store PostsStore
  const title = ref('Data postingan berdasarkan User'); // Simpan judul di sini
  const selectedUser = ref(null);
  const users = ref([]); // Simpan data pengguna di sini
  const loading = ref(true);
  
  // Hapus penggunaan props, karena kita tidak menggunakan props lagi
  
  const filteredPosts = computed(() => {
    if (!selectedUser.value) return postsStore.posts; // Gunakan data posts dari store
    return postsStore.posts.filter(post => post.userId === selectedUser.value);
  });


  
  onMounted(async () => {
    try {
      // Ambil data pengguna
      const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
      users.value = await usersResponse.json(); // Simpan data pengguna ke dalam ref users
  
      // Ambil data post
      const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
      postsStore.posts = await postsResponse.json(); // Simpan data post ke dalam store
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      loading.value = false;
    }

  });


  </script>
  
  
  <style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  .postBody {
    margin: 3%;
  }

  h3 {
    font-family: poppins;
    font-size: 1.5rem;
    font-weight: 500;
    color: aliceblue;
  }

  </style>
  