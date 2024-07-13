<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="text-center">تسجيل الدخول</h2>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12">
          <v-form @submit.prevent="login">
            <v-text-field v-model="username" label="اسم المستخدم"></v-text-field>
            <v-text-field v-model="password" label="كلمة المرور" type="password"></v-text-field>
            <v-btn type="submit" color="primary">تسجيل الدخول</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const username = ref('');
  const password = ref('');
  
  const login = async () => {
    try {
      const response = await axios.post('https://backend.babybuildingksa.com/v1/auth/login', {
        username: username.value,
        password: password.value
      });
      const accessToken = response.data.access_token;
      localStorage.setItem('accessToken', accessToken);
      console.log('تم تسجيل الدخول بنجاح.');
      navigateTo('/admin')
      // هنا يمكن توجيه المستخدم إلى صفحة أخرى بعد تسجيل الدخول بنجاح
    } catch (error) {
      console.error('حدث خطأ أثناء تسجيل الدخول:', error.message);
      alert('البيانات غير صحيحة')
    }
  };
  </script>
  
  <style>
  .text-center {
    text-align: center;
  }
  </style>
  