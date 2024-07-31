<template>
  <div>
    <navBar />
  <div class="flex">
    <!-- Sidebar -->
    <div class="w-1/4 p-4 bg-gray-200 h-screen">
      <h2 class="text-xl font-bold mb-4">الأقسام</h2>
      <ul>
        <li v-for="(section, index) in sections" :key="index" @click="selectSection(index)" class="cursor-pointer mb-2 p-2 hover:bg-gray-300 rounded">
          {{ section.name }}
        </li>
      </ul>
    </div>
    
    <!-- Main Content -->
    <div class="w-3/4 p-4">
      <component :is="currentComponent" />
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import AdminQuestions from '@/components/AdminQuestions.vue';
import AdminOffers from '@/components/AdminOffers.vue';
import NewSection from '@/components/NewSection.vue';
import Answers from '@/components/Answers.vue';

// قائمة الأقسام
const sections = [
  { name: 'الأسئلة الإدارية', component: AdminQuestions },
  { name: 'العروض الإدارية', component: AdminOffers },
  { name: 'الأقسام الجديدة', component: NewSection },
  { name: 'الإجابات', component: Answers }
];

// متغير لتتبع القسم النشط
const currentComponent = ref(sections[0].component);

// دالة لتحديث القسم النشط
const selectSection = (index) => {
  currentComponent.value = sections[index].component;
};
</script>

<style scoped>
/* يمكن أن تضيف أنماطك الخاصة هنا */
</style>
