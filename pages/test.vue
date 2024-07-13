<template>
  <div class="image-gallery">
    <img src='https://backend.babybuildingksa.com/uploads/1720832562917-897253660.jpg' alt="">

    <h1 class="text-3xl font-bold text-center mb-6">معرض الصور</h1>
    <div class="gallery">
      <div v-for="(image, index) in images" :key="index" class="gallery-item">
        <img :src="image.imagesUrl" :alt="image.title" class="gallery-image" />
        <p class="image-title">{{ image.title }}</p>
        <p class="image-description">{{ image.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const images = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('https://backend.babybuildingksa.com/v1/offers');
    images.value = response.data.data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imagesUrl: `https://backend.babybuildingksa.com/uploads/${item.imagesUrl}` // تعديل الرابط بناءً على المسار الحقيقي للصورة
    }));
  } catch (error) {
    console.error('حدث خطأ في جلب بيانات الصور:', error.message);
  }
});
</script>

<style scoped>
.image-gallery {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.gallery-item {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.gallery-image {
  width: 100%;
  height: auto;
  max-width: 100%;
  border-radius: 8px;
}

.image-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
}

.image-description {
  font-size: 1rem;
  color: #666;
}
</style>
