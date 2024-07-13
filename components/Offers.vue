<template>
    <div>
      <h3 class="text-3xl text-center pb-2 text-green-darken-1 bg-slate-300 rounded-full font-bold mb-10 mt-16 w-[80%] mx-auto">
        العروض
      </h3>
      <v-card class="text-center bg-grey-lighten-1 sm:mx-1 md:mx-10 rounded-lg">
          
          <v-tabs v-model="tab" bg-color="green-darken-3">
              <v-tab
                  v-for="(item, index) in tabs"
                  :key="index"
                  class="mx-auto"
                  :value="item.id"
              >
                  {{ item.title }}
              </v-tab>
          </v-tabs>
  
          <v-card-text>
              <v-window v-model="tab">
                  <v-window-item
                      v-for="(item, index) in tabs"
                      :key="index"
                      :value="item.id"
                  >
                      <img :src="item.imagesUrl" :alt="item.title" class="tab-image rounded mb-4" crossorigin="anonymous"/>
                      <h1>{{ item.description }}</h1>
                  </v-window-item>
              </v-window>
          </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const tabs = ref([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get('https://backend.babybuildingksa.com/v1/offers');
      tabs.value = response.data.data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        imagesUrl: `https://backend.babybuildingksa.com/uploads/${item.imagesUrl}` // تعديل الرابط بناءً على المسار الحقيقي للصورة
      }));
      
      // تعيين التاب الأخير كقيمة افتراضية لل tab
      tab.value = tabs.value[0].id;
    } catch (error) {
      console.error('حدث خطأ في جلب بيانات العروض:', error.message);
    }
  });
  
  const tab = ref(null); // للتحكم في التبويب المحدد بواسطة المستخدم
  </script>
  
  <style scoped>
  .v-tab--selected {
      color: #eeea03;
  }
  .tab-image {
      width: 100%;
      max-width: 500px;
      height: auto;
      margin: 0 auto;
  }
  </style>
  