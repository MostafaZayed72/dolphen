<template>
    <div>
      <h1 class="text-2xl font-bold text-center mt-8 mb-4">عرض الإجابات حسب نوع المستخدم</h1>
      <div class="flex justify-center mb-4">
        <label class="mx-2">
          <input type="radio" v-model="userType" value="applier"> Applier
        </label>
        <label class="mx-2">
          <input type="radio" v-model="userType" value="student"> Student
        </label>
      </div>
      <table class="border-collapse border border-gray-300 w-full">
        <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-300 px-4 py-2">رقم المستخدم</th>
            <th class="border border-gray-300 px-4 py-2">نوع المستخدم</th>
            <th class="border border-gray-300 px-4 py-2">الأسئلة والأجوبة</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(userData, index) in filteredUsers" :key="index">
            <td class="border border-gray-300 px-4 py-2">{{ userData.id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ userData.type }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <ul>
                <li v-for="(answer, ansIndex) in userData.answers" :key="ansIndex">
                  <strong>{{ answer.question.text }}:</strong> {{ answer.answerText }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, watch } from 'vue';
  import axios from 'axios';
  
  const usersData = ref([]);
  const userType = ref('student'); // افتراضياً سيتم عرض بيانات applier
  const token = ref();
  
  onMounted(() => {
    token.value = localStorage.getItem('accessToken');
    fetchUserData(); // استدعاء أولي لجلب البيانات عند التحميل الأول
  });
  
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/v1/answers/appliers?type=${userType.value}`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });
      usersData.value = response.data;
    } catch (error) {
      console.error('حدث خطأ في جلب بيانات المستخدمين:', error.message);
    }
  };
  
  // مراقبة تغيير قيمة userType واستدعاء fetchUserData عند التغيير
  watch(userType, () => {
    fetchUserData();
  });
  
  const filteredUsers = computed(() => {
    return usersData.value.filter(user => user.type === userType.value);
  });
  </script>
  
  <style scoped>
  table {
    border-collapse: collapse;
    width: 100%;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: right;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  