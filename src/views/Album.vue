<template>
  <q-page class="q-pa-md">
    <q-item-label header class="judul" >Albums</q-item-label>
  
    <div class="fit column reverse content-stretch">
      
      <q-card
        v-for="album in albums"
        :key="album.id"
        clickable
        @click="goToPhotos(album.id)"
        class="album-card"
      >
        <q-card-section class="album-card-content">
          <q-item-label>{{ album.title }}</q-item-label>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const albums = ref([]);
const router = useRouter();

const fetchAlbums = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  albums.value = await response.json();
};

const goToPhotos = (albumId) => {
  router.push(`/albums/${albumId}`);
};

onMounted(() => {
  fetchAlbums();
});
</script>

<style scoped>

.judul {
  font-family: roboto ;
  font-size: 30px ;
  color: aliceblue;
  text-align: center;
  font-weight: 400;
}

.album-card {
  margin-bottom: 16px;
  cursor: pointer;
  transition: transform 0.2s;
}

.album-card:hover {
  transform: scale(1.05);
}

.album-card-content {
  justify-content: center; /* Justify isi kartu */
}
</style>
