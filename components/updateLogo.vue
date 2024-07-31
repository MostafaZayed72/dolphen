<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">تعديل الشعار</h1>
      <form @submit.prevent="updateLogo">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="logo">رفع شعار جديد</label>
          <input @change="onFileChange" type="file" id="logo" accept="image/*" required>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">تحديث الشعار</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const selectedFile = ref(null);
  
  const onFileChange = (event) => {
    selectedFile.value = event.target.files[0];
  };
  
  const updateLogo = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert("يرجى تسجيل الدخول أولاً");
      return;
    }
  
    if (!selectedFile.value) {
      alert('يرجى اختيار ملف صورة.');
      return;
    }
  
    const formData = new FormData();
    formData.append('logo', selectedFile.value);
  
    try {
      const response = await axios.patch('https://backend.babybuildingksa.com/v1/page', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status === 200) {
        alert('تم تحديث الشعار بنجاح');
        selectedFile.value = null; // إعادة تعيين الملف المختار بعد الرفع الناجح
        window.location.reload()
      } else {
        throw new Error('حدث خطأ أثناء تحديث الشعار');
      }
    } catch (error) {
      console.error('خطأ في تحديث الشعار:', error);
      alert(`حدث خطأ أثناء تحديث الشعار: ${error.message}`);
    }
  };
  </script>
  
  <style scoped>
  /* يمكنك إضافة أي أنماط CSS خاصة هنا */
  </style>
  