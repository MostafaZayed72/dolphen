<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="text-center">جاري التحميل...</div>
    <div v-else>
      <div v-for="(section, index) in sections" :key="index" class="section mb-8">
        <h3 class="text-3xl text-center pb-2 text-green-darken-1 bg-slate-300 rounded-full font-bold mb-4">
          {{ section.title }}
        </h3>
        <p class="text-center text-2xl text-sky-700">
          {{ section.subtitle }}
        </p>
        <p class="text-green-600 text-center">
          {{ section.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const sections = ref([]);
const loading = ref(true);

onMounted(async () => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    alert("يرجى تسجيل الدخول أولاً");
    loading.value = false;
    return;
  }

  try {
    const response = await fetch('https://backend.babybuildingksa.com/v1/page', {
    
    });

    if (!response.ok) {
      throw new Error('حدث خطأ أثناء جلب البيانات');
    }

    const data = await response.json();
    sections.value = data.sections;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* يمكنك إضافة أي أنماط CSS خاصة هنا */
</style>
