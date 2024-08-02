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
          <th class="border border-gray-300 px-4 py-2">إجراءات</th>
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
          <td class="border border-gray-300 px-4 py-2">
            <button @click="deleteAnswer(userData.id)" class="text-red-600 hover:text-red-800 ml-2">حذف</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="exportToExcel" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">تصدير إلى Excel</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import * as XLSX from 'xlsx';

const usersData = ref([]);
const userType = ref('student');
const token = ref();

onMounted(() => {
  token.value = localStorage.getItem('accessToken');
  fetchUserData();
});

const fetchUserData = async () => {
  try {
    const response = await axios.get(`https://backend.babybuildingksa.com/v1/answers/appliers?type=${userType.value}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
    usersData.value = response.data;
  } catch (error) {
    console.error('حدث خطأ في جلب بيانات المستخدمين:', error.message);
  }
};

watch(userType, () => {
  fetchUserData();
});

const filteredUsers = computed(() => {
  return usersData.value.filter(user => user.type === userType.value);
});

const deleteAnswer = async (userId) => {
  if (confirm('هل أنت متأكد أنك تريد حذف هذه الإجابات؟')) {
    try {
      await axios.delete(`https://backend.babybuildingksa.com/v1/answers/${userId}`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });
      console.log('تم حذف الإجابات بنجاح');
      fetchUserData();
    } catch (error) {
      console.error('حدث خطأ في حذف الإجابات:', error.message);
    }
  }
};

const exportToExcel = () => {
  // تجهيز البيانات للتصدير
  const data = filteredUsers.value.map(user => ({
    'رقم المستخدم': user.id,
    'نوع المستخدم': user.type,
    'الأسئلة والأجوبة': user.answers.map(answer => `${answer.question.text}: ${answer.answerText}`).join('\n'),
  }));

  // تحويل البيانات إلى ورقة عمل
  const worksheet = XLSX.utils.json_to_sheet(data);

  // تعيين اتجاه الورقة من اليمين إلى اليسار
  worksheet['!dir'] = 'rtl';

  // ضبط عرض الأعمدة بناءً على أكبر محتوى في كل عمود
  const columnWidths = data.reduce((widths, row) => {
    Object.keys(row).forEach((key, index) => {
      const columnLength = row[key] ? row[key].toString().length : 10;
      if (!widths[index] || columnLength > widths[index]) {
        widths[index] = columnLength;
      }
    });
    return widths;
  }, []);

  worksheet['!cols'] = columnWidths.map(width => ({ width: width + 5 })); // إضافة 5 لضمان توسع كافي

  // إنشاء ملف Excel جديد
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'الإجابات');

  // كتابة الملف وتنزيله
  XLSX.writeFile(workbook, 'الإجابات.xlsx');
};
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
