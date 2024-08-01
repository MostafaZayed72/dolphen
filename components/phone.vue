<template>
    <div class="contact-number-manager">
      <h2 class="text-2xl font-bold mb-4">Manage Contact Number</h2>
      <div class="mb-4">
        <label for="phoneNumber" class="block font-semibold mb-1">Phone Number:</label>
        <input
          id="phoneNumber"
          v-model="phoneNumber"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        @click="updatePhoneNumber"
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
  
  const phoneNumber = ref('');
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
      phoneNumber.value = response.data.phoneNumber;
    } catch (error) {
      console.error('Error fetching contact number:', error);
    }
  });
  
  const updatePhoneNumber = async () => {
    try {
      const response = await axios.patch(
        'https://backend.babybuildingksa.com/v1/page',
        { phoneNumber: phoneNumber.value },
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert('Phone number updated successfully!');
      } else {
        alert('Failed to update phone number.');
      }
    } catch (error) {
      console.error('Error updating phone number:', error);
      alert('An error occurred while updating the phone number.');
    }
  };
  </script>
  
  <style scoped>
  .contact-number-manager {
    max-width: 400px;
    margin: auto;
  }
  </style>
  