<template>
    <div class="image-manager">
      <h2 class="text-2xl font-bold mb-4">Manage Images</h2>
      <div class="image-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div v-for="image in logosImages" :key="image.id" class="relative group">
          <img
            :src="`https://backend.babybuildingksa.com/uploads/${image.logoImage}`"
            alt="Managed Image"
            class="w-full h-40 object-cover rounded-md"
          />
          <div class="absolute bottom-2 right-2 flex gap-2">
            <!-- زر حذف -->
            <button
              @click="deleteImage(image.id)"
              class="bg-red-600 text-white p-1 rounded-full"
            >
              &times;
            </button>
          </div>
        </div>
      </div>
      <input type="file" @change="handleFileChange" class="mb-4" />
      <button 
        v-if="selectedFile" 
        @click="uploadImage" 
        class="bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Add Image
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const logosImages = ref([]);
  const selectedFile = ref(null);
  const token = ref('');
  
  onMounted(async () => {
    try {
      const response = await axios.get('https://backend.babybuildingksa.com/v1/page');
      logosImages.value = response.data.logosImages;
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  
    token.value = localStorage.getItem('accessToken');
  });
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    selectedFile.value = file || null;
  };
  
  const uploadImage = async () => {
    if (!selectedFile.value) return;
  
    const formData = new FormData();
    formData.append('images[]', selectedFile.value); // استخدم 'images[]' لإرسال الصورة
  
    try {
      const response = await axios.post('https://backend.babybuildingksa.com/v1/page/images', formData, {
        headers: {
          Authorization: `Bearer ${token.value}`
        },
      });
  
      if (!response.data) {
        throw new Error('No data returned from server');
      }
  
      const newImage = response.data;
      logosImages.value.push(newImage);
      selectedFile.value = null;
      window.location.reload()
    } catch (error) {
      console.error('Error uploading image:', error.response?.data || error.message);
    }
  };
  
  const deleteImage = async (id) => {
    try {
      await axios.delete(`https://backend.babybuildingksa.com/v1/page/footimage/${id}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
  
      logosImages.value = logosImages.value.filter((image) => image.id !== id);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };
  </script>
  
  <style scoped>
  .image-manager {
    max-width: 800px;
    margin: auto;
  }
  
  .group:hover .group-hover\:opacity-100 {
    opacity: 1;
  }
  
  .relative {
    position: relative;
  }
  
  .absolute {
    position: absolute;
  }
  
  .bottom-2 {
    bottom: 0.5rem; /* Adjust as needed */
  }
  
  .right-2 {
    right: 0.5rem; /* Adjust as needed */
  }
  </style>
  