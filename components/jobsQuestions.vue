<template>
    <div>
      <div class="text-center mt-16 mb-6">
        <h1 class="text-2xl font-bold">أهلاً بك في صفحة التوظيف</h1>
        <p class="font-bold mt-2">برجاء ملء الحقول التالية</p>
      </div>
      <v-container        style="direction: rtl;"   >
        <v-row
        style="direction: rtl;"
        >
          <v-col 
          style="direction: rtl;"

            v-for="(field, index) in fields" 
            :key="index" 
            cols="12" 
            md="4"
          >
            <input 
            style="border: 1px grey solid;"
            class="pl-20 md:pl-24 py-2 mx-auto rounded flex justify-center"
              v-model="field.value" 
              :placeholder="field.label"
            />
          </v-col>
          <v-col cols="12">

            <NuxtLink to="" class="bg-slate-300 px-8 py-2 rounded-xl cursor-pointer font-bold hover:bg-green-300 delayed flex justify-center w-fit mx-auto mt-10">سجل الآن</NuxtLink>

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
.delayed{
  transition: 0.5s;
}

input::placeholder {
  transition: opacity 0.5s ease;
}
input:focus::placeholder {
  opacity: 0;
}
</style>
  