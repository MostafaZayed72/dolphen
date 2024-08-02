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
import adminQuestions from '@/components/adminQuestions.vue';
import adminOffers from '@/components/adminOffers.vue';
import newSection from '@/components/newSection.vue';
import answers from '@/components/answers.vue';
import updateLogo from '@/components/updateLogo.vue';
// import socialIcons from '~/components/socialIcons.vue';
import phone from '~/components/phone.vue';
import navTitle from '~/components/navTitle.vue';


// قائمة الأقسام
const sections = [
  { name: 'الأسئلة الإدارية', component: adminQuestions },
  { name: 'العروض الإدارية', component: adminOffers },
  { name: 'الأقسام الجديدة', component: newSection },
  { name: 'تعديل اللوجو', component: updateLogo },
  // { name: 'أيقونات التواصل الإجتماعي', component: socialIcons },
  { name: ' رقم التواصل', component: phone },
  { name: ' اسم المنصة', component: navTitle },
  { name: 'الإجابات', component: answers }
];


// متغير لتتبع القسم النشط
const currentComponent = ref(sections[0].component);

// دالة لتحديث القسم النشط
const selectSection = (index) => {
  currentComponent.value = sections[index].component;
};


onMounted(async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    navigateTo('/signIn'); 
    return; 
  }
})


</script>

<style scoped>
/* يمكن أن تضيف أنماطك الخاصة هنا */
</style>
