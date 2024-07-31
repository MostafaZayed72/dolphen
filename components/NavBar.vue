<template>
    <nav class="flex justify-between items-center shadow-md py-3 sticky top-0 z-10 px-20 bg-slate-300">
      <!-- LOGO -->
      
  
      <!-- LINKS IN LARGE SCREEN -->
      <div class="mr-10 hidden lg:block">
        <ul class="flex gap-20 items-center font-semibold">
          <li><a href="#about" @click.prevent="scrollToSection('about')">من نحن</a></li>
          <li><a href="#skills" @click.prevent="scrollToSection('skills')">العروض</a></li>
          <li><a href="#services" @click.prevent="scrollToSection('services')">التواصل معنا</a></li>
          <li><a href="#portfolio" @click.prevent="scrollToSectiony('portfolio')">الوظائف</a></li>
        </ul>
      </div>
      <div class="flex items-center">
        <img :src="logoUrl" class="w-12 rounded-xl cursor-pointer hidden lg:block" alt="Logo" @click="toHome" />
      </div>
      <!-- LINKS IN SMALL SCREEN -->
      <div class="w-100 lg:hidden flex justify-center items-center gap-10">
        <DropMenu />
        <img :src="logoUrl" class="w-12 rounded-xl md:hidden cursor-pointer" alt="Logo" @click="toHome" />
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const logoUrl = ref('');
  
  onMounted(async () => {
    try {
      const response = await fetch('https://backend.babybuildingksa.com/v1/page');
      const data = await response.json();
      // Assuming the first logo image should be displayed
      logoUrl.value = `https://backend.babybuildingksa.com/uploads/${data.logo}`;
    } catch (error) {
      console.error('Error fetching logo:', error);
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
  