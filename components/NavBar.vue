<template>
  <nav class="flex justify-between items-center shadow-md py-3 sticky top-0 z-10 px-20 bg-slate-300">
    <!-- LINKS IN LARGE SCREEN -->
    <div class="mr-10 hidden lg:block">
      <ul class="flex gap-20 items-center font-semibold">
        <li><a href="#about" @click.prevent="scrollToSection('about')">من نحن</a></li>
        <li><a href="#skills" @click.prevent="scrollToSection('skills')">العروض</a></li>
        <li><a href="#services" @click.prevent="scrollToSection('services')">التواصل معنا</a></li>
        <li><a href="#portfolio" @click.prevent="scrollToSection('portfolio')">الوظائف</a></li>
      </ul>
    </div>
    <div class="flex items-center flex-col">
      <img :src="logoUrl" class="w-12 rounded-xl cursor-pointer hidden lg:block" alt="Logo" @click="toHome" />
      <h1 class="font-bold hidden lg:block">{{ navbarData }}</h1>
    </div>
    <!-- LINKS IN SMALL SCREEN -->
    <div class="w-100 lg:hidden flex justify-center items-center gap-10">
      <DropMenu />
      <div class="flex flex-col items-center">
        <img :src="logoUrl" class="w-12 rounded-xl md:hidden cursor-pointer" alt="Logo" @click="toHome" />
        <h1 class="font-bold">{{ navbarData }}</h1>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const logoUrl = ref('');
const navbarData = ref('');

onMounted(async () => {
  try {
    const response = await fetch('https://backend.babybuildingksa.com/v1/page');
    const data = await response.json();
    logoUrl.value = `https://backend.babybuildingksa.com/uploads/${data.logo}`;
    navbarData.value = data.navbarData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      window.scrollBy({
        top: -100,
        left: 0,
        behavior: 'smooth',
      });
    }, 500);
  }
};

const scrollToSectiony = scrollToSection;

const toHome = () => {
  navigateTo('/');
};
</script>

<style>
/* CSS remains the same */
</style>
