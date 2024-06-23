<template>
  <q-page class="q-pa-md">
    <q-item-label class="judul">Photos in Album</q-item-label>
    <div class="fit row inline justify-around items-end content-start">
      <q-card
        v-for="photo in photos"
        :key="photo.id"
        class="photo-card"
        clickable
        @click="openPhoto(photo)"
      >
        <q-img :src="photo.thumbnailUrl" class="gambar">
          <div class="absolute-bottom text-subtitle1 text-center">
            {{ photo.title }}
          </div>
        </q-img>
      </q-card>
    </div>
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

const openPhoto = (photo) => {
  window.open(photo.url, '_blank');
};

onMounted(() => {
  fetchPhotos();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.judul {
  font-family: roboto;
  font-size: 30px;
  color: aliceblue;
  text-align: center;
  font-weight: 400;
}

.photo-card {
  margin: 16px;
  margin-bottom: 5%;
  width: 300px;
  height: 300px;
  cursor: pointer;
  transition: transform 0.2s;
}

.photo-card:hover {
  transform: scale(1.05);
}
</style>
