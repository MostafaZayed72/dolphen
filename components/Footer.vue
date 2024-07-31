<template>
    <div class="mt-16 py-10 px-24 footer flex flex-col md:flex-row gap-10 justify-between items-center">
      <img :src="logoUrl" class="w-12 rounded-xl md:hidden cursor-pointer" alt="Logo" @click="toHome" />
      <div class="flex gap-4">
        <Icon class="text-3xl cursor-pointer" name="logos:twitter"/>
<Icon class="text-3xl cursor-pointer" name="logos:facebook"/>
<Icon class="text-3xl cursor-pointer" name="skill-icons:instagram"/>
<Icon class="text-3xl cursor-pointer" name="logos:whatsapp-icon"/>
      </div>

    </div>
</template>

<script setup>
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
  
  const toHome = () => {
    navigateTo('/');
  };

</script>