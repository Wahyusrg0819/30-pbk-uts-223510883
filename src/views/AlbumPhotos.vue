<template>
  <q-page class="q-pa-md">
    <q-list>
      <q-item-label header>Photos in Album</q-item-label>
      <q-card
        v-for="photo in photos"
        :key="photo.id"
        class="photo-card"
        clickable
        @click="openPhoto(photo.url)"
      >
        <q-card-section class="photo-card-content">
          <q-item-label>{{ photo.title }}</q-item-label>
          <q-img :src="photo.thumbnailUrl" :alt="photo.title" />
        </q-card-section>
      </q-card>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const albumId = route.params.albumId;

const photos = ref([]);

const fetchPhotos = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
  photos.value = await response.json();
};

const openPhoto = (photoUrl) => {
  window.open(photoUrl, '_blank');
};

onMounted(() => {
  fetchPhotos();
});
</script>

<style scoped>
.photo-card {
  margin-bottom: 16px;
  cursor: pointer;
  transition: transform 0.2s;
}

.photo-card-content {
  justify-content: center; /* Justify isi kartu */
}
</style>
