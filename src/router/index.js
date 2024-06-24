import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../views/Todos.vue';
import Post from '../views/Post.vue';
import Album from '../views/Album.vue';
import AlbumPhotos from '../views/AlbumPhotos.vue'; // Import AlbumPhotos.vue

const routes = [
  {
    path: '/',
    name: 'Todos',
    component: Todos
  },
  {
    path: '/post',
    name: 'Post',
    component: Post
  },
  {
    path: '/album',
    name: 'Album',
    component: Album
  },
  {
    path: '/albums/:albumId',
    name: 'AlbumPhotos',
    component: AlbumPhotos
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
