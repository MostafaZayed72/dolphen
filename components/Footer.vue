<template>
  <div class="mt-16 py-10 px-24 footer flex flex-col md:flex-row gap-10 justify-between items-center bg-slate-300">
    <div class="flex flex-col gap-4 items-center">
      <div class="flex gap-4">
       <nuxt-link to="https://snapchat.com/t/t9bOpJXF" target="_blank"><Icon name="simple-icons:snapchat" class="text-2xl cursor-pointer"/></nuxt-link>
       <nuxt-link to="https://api.whatsapp.com/send/?phone=966566514123&text&type=phone_number&app_absent=0" target="_blank"><Icon name="logos:whatsapp-icon" class="text-2xl cursor-pointer"/></nuxt-link>
       <nuxt-link to="https://www.tiktok.com/@babybuildingksa" target="_blank"><Icon name="logos:tiktok-icon" class="text-2xl cursor-pointer"/></nuxt-link>
       <nuxt-link to="https://www.instagram.com/babybuildingksa/" target="_blank"><Icon name="skill-icons:instagram" class="text-2xl cursor-pointer"/></nuxt-link>
       <nuxt-link to="https://youtube.com/@babybuildingksa?si=pWbQKkJzyNicUNgQ" target="_blank"><Icon name="logos:youtube-icon" class="text-2xl cursor-pointer"/></nuxt-link>
      </div>
      <a :href="`tel:${phoneNumber}`" class="text-lg font-semibold cursor-pointer">{{ phoneNumber }}</a>
    </div>
    <img
    v-if="logoUrl"
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
