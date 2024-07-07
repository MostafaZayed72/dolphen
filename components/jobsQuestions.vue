<template>
    <div>
      <div class="text-center mt-16 mb-6">
        <h1 class="text-2xl font-bold">أهلاً بك في صفحة التوظيف</h1>
        <p class="font-bold mt-2">برجاء ملء الحقول التالية</p>
      </div>
      <v-container>
        <v-row>
          <v-col 
            v-for="(field, index) in fields" 
            :key="index" 
            cols="12" 
            md="6"
          >
            <v-text-field 
              v-model="field.value" 
              :label="field.label"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const fields = ref([
    { label: 'الاسم الأول', value: '' },
    { label: 'الاسم الأخير', value: '' },
    { label: 'البريد الإلكتروني', value: '' },
    { label: 'رقم الهاتف', value: '' },
    { label: 'العنوان', value: '' },
    { label: 'المدينة', value: '' }
  ]);
  </script>
  
  <style scoped>
  /* يمكنك إضافة أنماط مخصصة هنا إذا لزم الأمر */
  </style>
  