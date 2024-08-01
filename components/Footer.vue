<template>
  <div class="mt-16 py-10 px-24 footer flex flex-col md:flex-row gap-10 justify-between items-center bg-slate-300">
    <div class="flex flex-col gap-4 items-center">
      <div class="flex gap-4">
        <img
          v-for="icon in logosImages"
          :key="icon.id"
          :src="`https://backend.babybuildingksa.com/uploads/${icon.logoImage}`"
          class="w-12 h-12 rounded-xl cursor-pointer"
          alt="Social Icon"
        />
      </div>
      <p class="mt-4 text-lg font-semibold">{{ phoneNumber }}</p>
    </div>
    <img
      :src="logoUrl"
      class="w-12 rounded-xl cursor-pointer"
      alt="Logo"
      @click="toHome"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const logoUrl = ref('');
const logosImages = ref([]);
const phoneNumber = ref('');

onMounted(async () => {
  try {
    const response = await fetch('https://backend.babybuildingksa.com/v1/page');
    const data = await response.json();

    // تعيين رابط شعار الموقع
    logoUrl.value = `https://backend.babybuildingksa.com/uploads/${data.logo}`;

    // تعيين روابط الأيقونات
    logosImages.value = data.logosImages;

    // تعيين رقم الهاتف
    phoneNumber.value = data.phoneNumber;
  } catch (error) {
    console.error('Error fetching page data:', error);
  }
});

const toHome = () => {
  // الانتقال إلى الصفحة الرئيسية
  window.location.href = '/';
};
</script>
