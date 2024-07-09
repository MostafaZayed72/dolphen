<template>
  <v-container>
    

    <!-- زر إضافة عرض جديد -->
    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn color="primary" @click="openDialog">إضافة عرض جديد</v-btn>
      </v-col>
    </v-row>

    <!-- جدول عرض العروض -->
    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="offers" class="elevation-1">
          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="editOffer(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteOffer(item.id)">
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- Dialog لإضافة عرض جديد -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">إضافة عرض جديد</span>
        </v-card-title>
        <v-card-text>
          <v-file-input v-model="newOffer.file" label="اختر ملف"></v-file-input>
          <v-text-field v-model="newOffer.description" label="الوصف"></v-text-field>
          <v-text-field v-model="newOffer.title" label="العنوان"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="addOffer">إضافة</v-btn>
          <v-btn color="grey darken-1" text @click="closeDialog">إلغاء</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog لتعديل العرض -->
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">تعديل العرض</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editedOffer.description" label="الوصف"></v-text-field>
          <v-text-field v-model="editedOffer.title" label="العنوان"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="updateOffer">حفظ التعديلات</v-btn>
          <v-btn color="grey darken-1" text @click="closeEditDialog">إلغاء</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const dialog = ref(false);
const editDialog = ref(false);
const offers = ref([]);
const newOffer = ref({
  file: null,
  description: '',
  title: ''
});
const editedOffer = ref({
  id: null,
  description: '',
  title: ''
});
const selectedOffer = ref(null);

const headers = [
  { text: 'الوصف', align: 'start', value: 'description' },
  { text: 'العنوان', value: 'title' },
  { text: 'أفعال', value: 'actions', sortable: false }
];

const fetchOffers = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/v1/offers`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJpYXQiOjE3MjA1NjEzMDAsImV4cCI6MTcyMDYwNDUwMH0._4aej6xMXMt02uRZ44r23U7_Qt56wFK71sEJj-AC3b8'
      }
    });
    offers.value = response.data.data;
  } catch (error) {
    console.error('حدث خطأ في جلب العروض:', error.message);
  }
};

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  newOffer.value = {
    file: null,
    description: '',
    title: ''
  };
};

const addOffer = async () => {
  if (!newOffer.value.file || !newOffer.value.description || !newOffer.value.title) return;

  const formData = new FormData();
  formData.append('file', newOffer.value.file);
  formData.append('description', newOffer.value.description);
  formData.append('title', newOffer.value.title);

  try {
    const response = await axios.post(`http://localhost:8000/v1/offers`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJpYXQiOjE3MjA1NjEzMDAsImV4cCI6MTcyMDYwNDUwMH0._4aej6xMXMt02uRZ44r23U7_Qt56wFK71sEJj-AC3b8'
      }
    });
    console.log('تمت إضافة العرض بنجاح:', response.data);
    closeDialog();
    await fetchOffers(); // لتحديث قائمة العروض بعد الإضافة
  } catch (error) {
    console.error('حدث خطأ في إضافة العرض:', error.message);
  }
};

const editOffer = (item) => {
  selectedOffer.value = item.id;
  editedOffer.value = {
    id: item.id,
    description: item.description,
    title: item.title
  };
  editDialog.value = true;
};

const updateOffer = async () => {
  try {
    const response = await axios.put(`http://localhost:8000/v1/offers/${editedOffer.value.id}`, {
      description: editedOffer.value.description,
      title: editedOffer.value.title
    }, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJpYXQiOjE3MjA1NjEzMDAsImV4cCI6MTcyMDYwNDUwMH0._4aej6xMXMt02uRZ44r23U7_Qt56wFK71sEJj-AC3b8'
      }
    });
    console.log('تم تعديل العرض بنجاح:', response.data);
    closeEditDialog();
    await fetchOffers(); // لتحديث قائمة العروض بعد التعديل
  } catch (error) {
    console.error('حدث خطأ في تعديل العرض:', error.message);
  }
};

const closeEditDialog = () => {
  editDialog.value = false;
  selectedOffer.value = null;
  editedOffer.value = {
    id: null,
    description: '',
    title: ''
  };
};

const deleteOffer = async (offerId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/v1/offers/${offerId}`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJpYXQiOjE3MjA1NjEzMDAsImV4cCI6MTcyMDYwNDUwMH0._4aej6xMXMt02uRZ44r23U7_Qt56wFK71sEJj-AC3b8'
      }
    });
    console.log('تم حذف العرض بنجاح:', response.data);
    await fetchOffers(); // لتحديث قائمة العروض بعد الحذف
  } catch (error) {
    console.error('حدث خطأ في حذف العرض:', error.message);
  }
};

onMounted(async () => {
  await fetchOffers();
});

watch(selectedOffer, async (newValue, oldValue) => {
  if (newValue !== oldValue && newValue !== null) {
    try {
      const response = await axios.get(`http://localhost:8000/v1/offers/${newValue}`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJpYXQiOjE3MjA1NjEzMDAsImV4cCI6MTcyMDYwNDUwMH0._4aej6xMXMt02uRZ44r23U7_Qt56wFK71sEJj-AC3b8'
        }
      });
      console.log('تفاصيل العرض:', response.data);
    } catch (error) {
      console.error('حدث خطأ في جلب تفاصيل العرض:', error.message);
    }
  }
});
</script>

<style>
.text-right {
  text-align: right;
}
</style>
