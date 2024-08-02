<template>
    <div class="navbar-data-manager">
      <h2 class="text-2xl font-bold mb-4">تغيير اسم المنصة</h2>
      <div class="mb-4">
        <label for="navbarData" class="block font-semibold mb-1">اسم المنصة:</label>
        <input
          id="navbarData"
          v-model="navbarData"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        @click="updateNavbarData"
        class="bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Save Changes
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const navbarData = ref('');
  const token = ref('');
  const router = useRouter();
  
  onMounted(async () => {
    token.value = localStorage.getItem('accessToken');
  
    if (!token.value) {
      router.push('/signIn');
      return;
    }
  
    try {
      const response = await axios.get('https://backend.babybuildingksa.com/v1/page', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      navbarData.value = response.data.navbarData;
    } catch (error) {
      console.error('Error fetching navbar data:', error);
    }
  });
  
  const updateNavbarData = async () => {
    try {
      const response = await axios.patch(
        'https://backend.babybuildingksa.com/v1/page',
        { navbarData: navbarData.value },
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert('تم تحيث الإسم بنجاح');
window.location.reload()
      } else {
        alert('Failed to update navbar data.');
      }
    } catch (error) {
      console.error('Error updating navbar data:', error);
      alert('An error occurred while updating the navbar data.');
    }
  };
  </script>
  
  <style scoped>
  .navbar-data-manager {
    max-width: 600px;
    margin: auto;
  }
  </style>
  