<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">إضافة قسم جديد</h1>
      <form @submit.prevent="addSection">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">العنوان</label>
          <input v-model="newSection.title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="العنوان" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="subtitle">العنوان الفرعي</label>
          <input v-model="newSection.subtitle" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subtitle" type="text" placeholder="العنوان الفرعي" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="content">الوصف</label>
          <textarea v-model="newSection.content" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="content" placeholder="الوصف" required></textarea>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">إضافة</button>
        </div>
      </form>
  
      <h2 class="text-xl font-bold mt-10 mb-4">العروض الحالية</h2>
      <v-data-table
        :headers="headers"
        :items="offers"
        item-value="id"
        class="elevation-1"
      >
        <template v-slot:item.index="{ index }">
          <td>{{ index + 1 }}</td>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn small color="yellow" @click="startEditing(item)">تعديل</v-btn>
          <v-btn small color="red" @click="deleteOffer(item.id)">حذف</v-btn>
        </template>
      </v-data-table>
  
      <!-- نموذج تعديل العرض -->
      <v-dialog v-model="isEditing" max-width="500px">
        <v-card>
          <v-card-title style="direction: rtl;">
            <span class="text-h5">تعديل العرض</span>
          </v-card-title>
          <v-card-subtitle>
            <form @submit.prevent="updateOffer">
              <v-text-field reverse v-model="currentOffer.title" label="العنوان" required></v-text-field>
              <v-text-field reverse v-model="currentOffer.subtitle" label="العنوان الفرعي" required></v-text-field>
              <v-textarea reverse v-model="currentOffer.content" label="الوصف" required></v-textarea>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue" text @click="isEditing = false">إلغاء</v-btn>
                <v-btn color="blue" @click="updateOffer">حفظ</v-btn>
              </v-card-actions>
            </form>
          </v-card-subtitle>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const newSection = ref({
    title: '',
    subtitle: '',
    content: ''
  });
  
  const offers = ref([]);
  const headers = ref([
    { text: 'رقم', value: 'index' },
    { text: 'العنوان', value: 'title' },
    { text: 'العنوان الفرعي', value: 'subtitle' },
    { text: 'الوصف', value: 'content' },
    { text: 'الإجراءات', value: 'actions', sortable: false }
  ]);
  
  const isEditing = ref(false);
  const currentOffer = ref({ title: '', subtitle: '', content: '', id: '' });
  
  const addSection = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert("يرجى تسجيل الدخول أولاً");
      return;
    }
  
    try {
      await axios.post('https://backend.babybuildingksa.com/v1/page/sections', newSection.value, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      alert('تمت إضافة القسم بنجاح');
      newSection.value = { title: '', subtitle: '', content: '' };
      fetchOffers();
    } catch (error) {
      console.error('خطأ في إضافة القسم:', error);
      alert(`حدث خطأ أثناء إضافة القسم: ${error.message}`);
    }
  };
  
  const fetchOffers = async () => {
    const token = localStorage.getItem('accessToken');
  
    if (!token) {
      alert("يرجى تسجيل الدخول أولاً");
      return;
    }
  
    try {
      const response = await axios.get('https://backend.babybuildingksa.com/v1/page', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status !== 200) {
        throw new Error('حدث خطأ أثناء جلب البيانات');
      }
  
      offers.value = response.data.sections.map((section, index) => ({
        ...section,
        index: index
      }));
    } catch (error) {
      console.error('خطأ في جلب البيانات:', error);
      alert(`حدث خطأ أثناء جلب البيانات: ${error.message}`);
    }
  };
  
  const startEditing = (offer) => {
    currentOffer.value = { ...offer }; // إنشاء نسخة من العرض الحالي
    isEditing.value = true; // فتح نموذج التعديل
  };
  
  const updateOffer = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert("يرجى تسجيل الدخول أولاً");
      return;
    }
  
    try {
      const response = await axios.patch(`https://backend.babybuildingksa.com/v1/page/sections/${currentOffer.value.id}`, {
        title: currentOffer.value.title,
        subtitle: currentOffer.value.subtitle,
        content: currentOffer.value.content
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status !== 200) {
        throw new Error('حدث خطأ أثناء تحديث القسم');
      }
  
      alert('تمت عملية التعديل بنجاح');
      isEditing.value = false; // إغلاق نموذج التعديل
      fetchOffers(); // تحديث قائمة العروض
    } catch (error) {
      console.error('خطأ في تعديل القسم:', error);
      alert(`حدث خطأ أثناء تعديل القسم: ${error.message}`);
    }
  };
  
  const deleteOffer = async (id) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert("يرجى تسجيل الدخول أولاً");
      return;
    }
  
    try {
      const response = await axios.delete(`https://backend.babybuildingksa.com/v1/page/sections/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (response.status !== 200) {
        throw new Error('حدث خطأ أثناء حذف القسم');
      }
  
      alert('تم حذف القسم بنجاح');
      fetchOffers();
    } catch (error) {
      console.error('خطأ في حذف القسم:', error);
      alert(`حدث خطأ أثناء حذف القسم: ${error.message}`);
    }
  };
  
  onMounted(() => {
    fetchOffers();
  });
  </script>
  
  <style scoped>
  /* يمكنك إضافة أي أنماط CSS خاصة هنا */
  </style>
  