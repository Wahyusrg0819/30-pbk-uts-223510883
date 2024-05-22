<template>
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
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { defineProps } from 'vue'
  
  const props = defineProps({
    title: {
      type: String,
      required: true
    }
  })
  
  const selectedUser = ref(null)
  const users = ref([])
  const posts = ref([])
  const loading = ref(true)
  
  const filteredPosts = computed(() => {
    if (!selectedUser.value) return posts.value
    return posts.value.filter(post => post.userId === selectedUser.value)
  })
  
  onMounted(async () => {
    try {
      const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users')
      const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts')
      users.value = await usersResponse.json()
      posts.value = await postsResponse.json()
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <style>
  /* Tambahkan styling sesuai kebutuhan */
  </style>
  